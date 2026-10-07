// src/components/ChatStory.jsx
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Heart, User } from 'lucide-react';
import { loveData } from '../data/loveData';
import { playKeyPop } from '../utils/soundEffects';
import './ChatStory.css';

export default function ChatStory({ soundEnabled }) {
  const chatList = loveData.chat || [];
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSender, setTypingSender] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const chatBodyRef = useRef(null);
  const sectionRef = useRef(null);

  // Trigger playback when user scrolls section into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || visibleCount >= chatList.length) return;

    const nextMsg = chatList[visibleCount];
    setTypingSender(nextMsg.sender);
    setIsTyping(true);

    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      setVisibleCount((prev) => prev + 1);
      playKeyPop(soundEnabled);
    }, 1100);

    return () => clearTimeout(typingTimer);
  }, [visibleCount, chatList, soundEnabled, hasStarted]);

  // Scroll inner chat container only (prevent whole page window jumps)
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [visibleCount, isTyping]);

  return (
    <section className="chat-section" ref={sectionRef}>
      <motion.div
        className="chat-wrapper glass-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="chat-header">
          <div className="chat-title-group">
            <MessageCircle color="#FF4F81" size={24} />
            <h2 className="chat-heading font-serif text-gradient">
              Conversations I'll Always Remember ❤️
            </h2>
          </div>
          <div className="chat-status-badge">
            <span className="online-dot"></span>
            <span>Active Memory</span>
          </div>
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          <AnimatePresence>
            {chatList.slice(0, visibleCount).map((msg, index) => {
              const isMe = msg.sender === 'me';
              return (
                <motion.div
                  key={index}
                  className={`chat-bubble-row ${isMe ? 'row-me' : 'row-her'}`}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="avatar">
                    {isMe ? 'Me ❤️' : `${loveData.girlfriendName || 'Her'} ❤️`}
                  </div>
                  <div className={`chat-bubble ${isMe ? 'bubble-me' : 'bubble-her'}`}>
                    {msg.message}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              className={`chat-bubble-row ${typingSender === 'me' ? 'row-me' : 'row-her'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="avatar">
                {typingSender === 'me' ? 'Me ❤️' : `${loveData.girlfriendName || 'Her'} ❤️`}
              </div>
              <div className="chat-bubble typing-bubble">
                <span className="dot d1">•</span>
                <span className="dot d2">•</span>
                <span className="dot d3">•</span>
              </div>
            </motion.div>
          )}
        </div>

        {visibleCount >= chatList.length && (
          <motion.div
            className="chat-outro font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="outro-line1">Some conversations disappear...</p>
            <p className="outro-line2 text-gradient">...but some become memories.</p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
