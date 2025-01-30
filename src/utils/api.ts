import { Content, ContentInput, ContentQueryParams } from '@/types/content';

const API_URL = 'https://ym3xy6k9g4.execute-api.ap-southeast-2.amazonaws.com';

export const api = {
    // Existing methods
    getUploadUrl: async (fileName: string, contentType: string) => {
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName, contentType })
        });
        return response.json();
    },

    uploadToS3: async (url: string, file: File) => {
        await fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type
            }
        });
    },

    // Enhanced methods
    createContent: async (content: ContentInput): Promise<Content> => {
        const response = await fetch(`${API_URL}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...content,
                id: crypto.randomUUID(),
                status: 'draft',
                viewCount: 0,
                createdAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create content');
        }

        return response.json();
    },

    // New methods
    getContent: async (params?: ContentQueryParams): Promise<Content[]> => {
        const queryParams = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                if (value) queryParams.append(key, value.toString());
            });
        }

        const response = await fetch(
            `${API_URL}/content?${queryParams.toString()}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }

        return response.json();
    },

    getContentById: async (id: string): Promise<Content> => {
        const response = await fetch(`${API_URL}/content/${id}`);
        
        if (!response.ok) {
            throw new Error('Content not found');
        }

        return response.json();
    },

    updateContent: async (id: string, updates: Partial<ContentInput>): Promise<Content> => {
        const response = await fetch(`${API_URL}/content/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...updates,
                updatedAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update content');
        }

        return response.json();
    },

    deleteContent: async (id: string): Promise<void> => {
        const response = await fetch(`${API_URL}/content/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete content');
        }
    },

    // Analytics methods
    incrementViewCount: async (id: string): Promise<void> => {
        await fetch(`${API_URL}/content/${id}/view`, {
            method: 'POST'
        });
    },

    // Content management methods
    publishContent: async (id: string): Promise<Content> => {
        return api.updateContent(id, { status: 'published' });
    },

    unpublishContent: async (id: string): Promise<Content> => {
        return api.updateContent(id, { status: 'draft' });
    }
};