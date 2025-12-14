import { Pot, PotSimplified } from '../types'
import { supabase } from '../lib/supabase';
import { pots } from '../data/mockData';

  const getAll = async (isGuest:boolean) : Promise<Pot[]> => {
    const { data, error } = await supabase
      .from('pots')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return isGuest ? pots.concat(data) : data;
  }

  const create = async (pot: PotSimplified): Promise<Pot> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('pots')
      .insert([{ ...pot, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const update = async (id: string, updates: Partial<Pot>): Promise<Pot> => {
    const { data, error } = await supabase
      .from('pots')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const remove = async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('pots')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

export default {getAll, create, update, remove}