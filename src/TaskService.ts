import { db, auth } from "./firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { useState } from "react";
import { Task } from "./Types";

