import { feedbackClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';
import type { Feedback } from '@/shared/proto/admin';

export async function listFeedback(): Promise<Feedback[]> {
  const response = await callRpc(() => feedbackClient.listFeedback({ offset: 0, limit: 100, search: '' }));
  return response.feedback;
}

export async function deleteFeedback(feedbacksId: string): Promise<void> {
  await callRpc(() => feedbackClient.deleteFeedback({ value: feedbacksId }));
}

export interface FeedbackDraft {
  name: string;
  email: string;
  type: string;
  message: string;
  rating: number;
}

export async function createFeedback(draft: FeedbackDraft): Promise<string> {
  const response = await callRpc(() =>
    feedbackClient.createFeedback({
      name: draft.name,
      email: draft.email,
      type: draft.type,
      message: draft.message,
      rating: draft.rating,
      diagnosticsJson: '{}',
    }),
  );
  return response.value;
}
