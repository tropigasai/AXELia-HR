/**
 * Thin TypeScript wrapper around getcody.ai REST API v1.
 * Author: Trop-IA HR Agent
 */
import axios, { AxiosInstance } from 'axios';
import FormData from 'form-data';
import { getEnv } from '../config/env';

const { CODY_API_KEY } = getEnv();

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

class CodyClient {
  private api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.getcody.ai/v1',
      headers: {
        Authorization: `Bearer ${CODY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
  }
  async chat(modelId: string, messages: ChatMessage[]) {
    const { data } = await this.api.post('/chat/completions', { model: modelId, messages });
    return data;
  }
  async uploadFile(filePath: string, namespace = 'hr') {
    const formData = new FormData();
    formData.append('file', require('fs').createReadStream(filePath));
    formData.append('namespace', namespace);
    const { data } = await this.api.post('/files/upload', formData, {
      headers: formData.getHeaders(),
    });
    return data;
  }
}
export const cody = new CodyClient();
