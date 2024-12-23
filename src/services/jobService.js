// src/services/jobService.js
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';

export const jobService = {
  async createJob(jobData, userId) {
    try {
      const jobsRef = collection(db, 'jobs');
      const newJob = {
        ...jobData,
        userId,
        createdAt: serverTimestamp(),
        reactions: []
      };
      const docRef = await addDoc(jobsRef, newJob);
      return { id: docRef.id, ...newJob };
    } catch (error) {
      throw error;
    }
  },

  async getJobs() {
    try {
      const jobsRef = collection(db, 'jobs');
      const q = query(jobsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw error;
    }
  },

  async getJobById(jobId) {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnap = await getDoc(jobRef);
      if (jobSnap.exists()) {
        return { id: jobSnap.id, ...jobSnap.data() };
      }
      return null;
    } catch (error) {
      throw error;
    }
  },

  async updateJob(jobId, jobData) {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await updateDoc(jobRef, {
        ...jobData,
        updatedAt: serverTimestamp()
      });
      return { id: jobId, ...jobData };
    } catch (error) {
      throw error;
    }
  },

  async deleteJob(jobId) {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      await deleteDoc(jobRef);
      return jobId;
    } catch (error) {
      throw error;
    }
  },

  async toggleReaction(jobId, userId, reactionType) {
    try {
      const jobRef = doc(db, 'jobs', jobId);
      const jobSnap = await getDoc(jobRef);
      const jobData = jobSnap.data();
      
      let updatedReactions = [...(jobData.reactions || [])];
      const existingReaction = updatedReactions.findIndex(
        r => r.userId === userId && r.type === reactionType
      );

      if (existingReaction > -1) {
        updatedReactions.splice(existingReaction, 1);
      } else {
        updatedReactions.push({
          userId,
          type: reactionType,
          timestamp: new Date()
        });
      }

      await updateDoc(jobRef, { reactions: updatedReactions });
      return updatedReactions;
    } catch (error) {
      throw error;
    }
  }
};