import { enumClient } from '@/shared/apiClient';
import { callRpc } from '@/shared/session';

export interface EnumOption {
  value: string;
  intValue: number;
  description: string;
}

export async function listEnums(enumType: string): Promise<EnumOption[]> {
  const response = await callRpc(() => enumClient.listEnums({ enumType }));
  return response.values.map((entry) => ({
    value: entry.value,
    intValue: entry.intValue,
    description: entry.description,
  }));
}
