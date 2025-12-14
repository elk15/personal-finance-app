import { Budget, BudgetSimplified } from '../types'
import { supabase } from '../lib/supabase';
import { budgets } from '../data/mockData';

  const getAll = async (isGuest:boolean) : Promise<Budget[]> => {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return isGuest ? budgets.concat(data) : data;
  }

  const create = async (budget: BudgetSimplified): Promise<Budget> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('budgets')
      .insert([{ ...budget, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const update = async (id: string, updates: Partial<Budget>): Promise<Budget> => {
    const { data, error } = await supabase
      .from('budgets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const remove = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

export default {getAll, create, update, remove}