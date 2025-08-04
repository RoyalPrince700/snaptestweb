// src/services/supabaseService.js
import { supabase } from '../../supabase/supabaseClient';

class SupabaseService {
  constructor() {
    this.supabase = supabase;
  }

  // Get the currently authenticated user
  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  // Save a new question set, returning the full record with parsed questions
  async saveQuestionSet({ title, questions, questionType, sourceText }) {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not found');

    const payload = {
      user_id: user.id,
      title,
      questions,          // JSON column accepts JS array directly
      question_type: questionType,
      source_text: sourceText,
    };

    const { data, error } = await this.supabase
      .from('question_sets')
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      console.error('Save question set failed:', error);
      throw error;
    }

    // Parse questions if stored as JSON string (depends on your column type)
    return {
      id: data.id,
      title: data.title,
      questionType: data.question_type,
      sourceText: data.source_text,
      createdAt: data.created_at,
      questions:
        typeof data.questions === 'string'
          ? JSON.parse(data.questions)
          : data.questions,
    };
  }

  // ... inside SupabaseService class

  // Delete a question set by its ID
  async deleteQuestionSet(setId) {
    const { error } = await this.supabase
      .from('question_sets')
      .delete()
      .eq('id', setId);

    if (error) {
      console.error('Delete question set failed:', error);
      throw error;
    }
    return true;
  }


  // Fetch a single question set by ID, returning parsed questions
  async getQuestionSet(setId) {
    const { data, error } = await this.supabase
      .from('question_sets')
      .select('*')
      .eq('id', setId)
      .maybeSingle();

    if (error) {
      console.error('Fetch question set failed:', error);
      throw error;
    }
    if (!data) throw new Error('Question set not found');

    return {
      id: data.id,
      title: data.title,
      questionType: data.question_type,
      sourceText: data.source_text,
      createdAt: data.created_at,
      questions:
        typeof data.questions === 'string'
          ? JSON.parse(data.questions)
          : data.questions,
    };
  }

  // Fetch all question sets for the current user (id, title, created_at)
 // src/services/supabaseService.js

  // Fetch all question sets for the current user (id, title, questions, created_at, last_score)
  async getAllQuestionSets() {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('User not found');

    const { data, error } = await this.supabase
      .from('question_sets')
      .select('id, title, questions, created_at, last_score,question_type')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch all question sets failed:', error);
      throw error;
    }

    // Ensure questions is parsed if stored as string
    return data.map((row) => ({
      ...row,
      questions:
        typeof row.questions === 'string' ? JSON.parse(row.questions) : row.questions,
    }));
  }


  /**
   * Record the last_score on a question_set
   * @param {string} setId
   * @param {number} score
   */
  async updateQuestionSetScore(setId, score) {
    const { error } = await this.supabase
      .from('question_sets')
      .update({ last_score: score })
      .eq('id', setId);

    if (error) {
      console.error('Failed to update score:', error);
      throw error;
    }
    return true;
  }
}

export const supabaseService = new SupabaseService();
