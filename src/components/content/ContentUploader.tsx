import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { Upload, X, Check, Tag, Plus, Image } from 'lucide-react';
import { api } from '@/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

type ContentType = 'video' | 'article' | 'audio';
type ContentLevel = 'beginner' | 'intermediate' | 'advanced';

interface ContentUploaderProps {
  type: ContentType;
}

const topics = [
  'Focus & Organization',
  'Social Navigation',
  'Sports & Competition',
  'Self-Discovery',
  'Parent Resources',
  'Skill Building',
  'Mood Boosters',
  'Eating Patterns',
  'ADHD Superpowers',
  'Emotional Management'
] as const;

export function ContentUploader({ type }: ContentUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [contentLevel, setContentLevel] = useState<ContentLevel>('beginner');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [duration, setDuration] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setError(null);
    }
  }, []);

  const onThumbnailDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setThumbnail(acceptedFiles[0]);
      setThumbnailPreview(URL.createObjectURL(acceptedFiles[0]));
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': type === 'video' ? [] : undefined,
      'audio/*': type === 'audio' ? [] : undefined,
      'application/pdf': type === 'article' ? [] : undefined
    },
    maxFiles: 1
  });

  const { 
    getRootProps: getThumbnailRootProps, 
    getInputProps: getThumbnailInputProps, 
    isDragActive: isThumbnailDragActive 
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: {
      'image/*': []
    },
    maxFiles: 1
  });

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !topic || (type === 'video' && !thumbnail)) {
      setError('Please fill in all required fields');
      return;
    }

    setIsUploading(true);
    setError(null);
    setProgress(0);
    
    try {
      // Get upload URL for main content
      setProgress(10);
      const { uploadUrl, key } = await api.getUploadUrl(file.name, file.type);
      
      // Upload main content to S3
      setProgress(30);
      await api.uploadToS3(uploadUrl, file);
      
      // If there's a thumbnail, upload it
      let thumbnailKey = null;
      if (thumbnail) {
        setProgress(50);
        const { uploadUrl: thumbUrl, key: thumbKey } = await api.getUploadUrl(
          `thumbnail-${thumbnail.name}`, 
          thumbnail.type
        );
        await api.uploadToS3(thumbUrl, thumbnail);
        thumbnailKey = thumbKey;
      }
      
      // Create content with thumbnail
      setProgress(70);
      await api.createContent({
        id: uuidv4(),
        type,
        title,
        description,
        s3Key: key,
        thumbnailKey,
        topic,
        mediaType: file.type,
        contentLevel,
        tags,
        duration: duration ? parseInt(duration) : undefined,
        viewCount: 0,
        status: 'draft'
      });

      setProgress(100);
      setSuccess(true);
      
      // Reset form
      setTimeout(() => {
        setFile(null);
        setThumbnail(null);
        setThumbnailPreview(null);
        setTitle('');
        setTopic('');
        setDescription('');
        setTags([]);
        setDuration('');
        setContentLevel('beginner');
        setIsUploading(false);
        setProgress(0);
        setSuccess(false);
      }, 2000);

    } catch (error) {
      setError('Error uploading content. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-2">
        <Label>Upload {type}</Label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-accent-purple bg-accent-purple/10' : 'border-dark-600 hover:border-accent-purple'}
            ${error ? 'border-red-500' : ''}`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          {file ? (
            <div className="mt-2">
              <p className="text-sm text-white">{file.name}</p>
              <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div className="mt-2">
              <p className="text-sm text-white">Drag & drop or click to select a {type}</p>
              <p className="text-xs text-gray-400">Maximum file size: 500MB</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="bg-dark-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="topic">Topic</Label>
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger className="bg-dark-700">
            <SelectValue placeholder="Select topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contentLevel">Content Level</Label>
        <Select value={contentLevel} onValueChange={(value: ContentLevel) => setContentLevel(value)}>
          <SelectTrigger className="bg-dark-700">
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(type === 'video' || type === 'audio') && (
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Enter duration in minutes"
            className="bg-dark-700"
          />
        </div>
      )}

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="bg-dark-700 text-white px-2 py-1 rounded-full text-sm flex items-center gap-1"
            >
              {tag}
              <button 
                type="button" 
                onClick={() => removeTag(tag)}
                className="hover:text-red-400"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            className="bg-dark-700"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
          />
          <Button type="button" onClick={addTag} variant="outline" size="sm">
            <Plus size={16} className="mr-1" />
            Add
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="bg-dark-700 min-h-[100px]"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm flex items-center">
          <X className="mr-2 h-4 w-4" />
          {error}
        </div>
      )}

      {success && (
        <div className="text-green-500 text-sm flex items-center">
          <Check className="mr-2 h-4 w-4" />
          Content uploaded successfully!
        </div>
      )}

      {isUploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-400">Uploading... {progress}%</p>
        </div>
      )}

      {type === 'video' && (
        <div className="space-y-2">
          <Label>Upload Thumbnail</Label>
          <div
            {...getThumbnailRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isThumbnailDragActive ? 'border-accent-purple bg-accent-purple/10' : 'border-dark-600 hover:border-accent-purple'}
              ${error && !thumbnail ? 'border-red-500' : ''}`}
          >
            <input {...getThumbnailInputProps()} />
            {thumbnailPreview ? (
              <div className="relative">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  className="max-h-40 mx-auto rounded"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setThumbnail(null);
                    setThumbnailPreview(null);
                  }}
                  className="absolute top-2 right-2 p-1 bg-dark-900/80 rounded-full hover:bg-dark-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-white">Drop a thumbnail image or click to select</p>
                <p className="text-xs text-gray-400">Recommended size: 1280x720px</p>
              </div>
            )}
          </div>
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isUploading}
        className="w-full"
      >
        {isUploading ? 'Uploading...' : 'Upload Content'}
      </Button>
    </form>
  );
}