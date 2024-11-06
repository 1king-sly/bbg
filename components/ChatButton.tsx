"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Maximize2, Minimize2, Clock, Check } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: Date;
}

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      sender: 'other',
      status: 'read',
      timestamp: new Date()
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      status: 'pending',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate message status changes
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 2000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-3 w-3" />;
      case 'sent':
        return <Check className="h-3 w-3" />;
      case 'delivered':
        return <div className="flex"><Check className="h-3 w-3" /><Check className="h-3 w-3 -ml-1" /></div>;
      case 'read':
        return <div className="flex text-blue-500"><Check className="h-3 w-3" /><Check className="h-3 w-3 -ml-1" /></div>;
      case 'failed':
        return <X className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed ${isExpanded ? 'inset-0 pt-16 pb-10' : 'bottom-4 right-4 w-80 h-96 pb-6 '} transition-all duration-300 `}>
      <div className="flex items-center justify-between border-b">
        <h3 className="font-semibold">Chat Support</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{msg.content}</p>
                {msg.sender === 'user' && (
                  <div className="flex justify-end items-center gap-1 mt-1">
                    <span className="text-xs opacity-70">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {getStatusIcon(msg.status)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>
      </div>
    </Card>
  );
}