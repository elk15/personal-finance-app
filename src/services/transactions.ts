import { Transaction, TransactionSimplified } from '../types'
import { supabase } from '../lib/supabase';
import { transactions } from '../data/mockData';

  const getAll = async (isGuest:boolean) : Promise<Transaction[]> => {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return isGuest ? transactions.concat(data) : data;
  }

  const create = async (transaction: TransactionSimplified): Promise<Transaction> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...transaction, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const update = async (id: string, updates: Partial<Transaction>): Promise<Transaction> => {
    const { data, error } = await supabase
      .from('transactions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const remove = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

export default {getAll, create, update, remove}