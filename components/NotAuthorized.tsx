"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowLeft, Lock } from "lucide-react";
import {motion} from "framer-motion"
export default function NotAuthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-2xl"
      >
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 1, repeat: Infinity, repeatDelay: 2 }
          }}
          className="inline-block"
        >
          <Lock className="w-24 h-24 mx-auto text-red-500 dark:text-red-400" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Whoops! Nice Try 😅
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Looks like you&apos;re trying to sneak into a VIP area without being on the guest list!
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <div className="flex items-center justify-center space-x-2 text-amber-600 dark:text-amber-500">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">Access Denied</p>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Don&apos;t worry, it happens to the best of us! Maybe try logging in with the right account?
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-4"
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            
            <span>Go Back</span>
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you think this is a mistake, contact your system administrator
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}