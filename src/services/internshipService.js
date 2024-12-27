// services/internshipService.js
import { db } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';

export const internshipService = {
  async createInternship(internshipData) {
    try {
      const internshipsRef = collection(db, 'internships');
      const docRef = await addDoc(internshipsRef, {
        ...internshipData,
        createdAt: new Date(),
        reactions: []
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating internship:', error);
      throw error;
    }
  },

  async getInternshipById(id) {
    try {
      const docRef = doc(db, 'internships', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting internship:', error);
      throw error;
    }
  },

  async getAllInternships() {
    try {
      const q = query(collection(db, 'internships'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting internships:', error);
      throw error;
    }
  },

  async updateInternship(id, data) {
    try {
      const docRef = doc(db, 'internships', id);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating internship:', error);
      throw error;
    }
  },

  async deleteInternship(id) {
    try {
      const docRef = doc(db, 'internships', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting internship:', error);
      throw error;
    }
  },

  async toggleReaction(internshipId, userId, reactionType) {
    try {
      const docRef = doc(db, 'internships', internshipId);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new Error('Internship not found');
      }

      const internship = docSnap.data();
      const reactions = internship.reactions || [];
      const existingReaction = reactions.findIndex(r => r.userId === userId);

      if (existingReaction > -1) {
        reactions.splice(existingReaction, 1);
      } else {
        reactions.push({ userId, type: reactionType, timestamp: new Date() });
      }

      await updateDoc(docRef, { reactions });
    } catch (error) {
      console.error('Error toggling reaction:', error);
      throw error;
    }
  }
};