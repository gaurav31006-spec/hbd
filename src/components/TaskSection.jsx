// src/components/TaskSection.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, CheckCircle2, Sparkles, HelpCircle, Lock } from 'lucide-react';
import { playHeartClick, playCelebrateChime } from '../utils/soundEffects';
import './TaskSection.css';

export default function TaskSection({ onAllTasksCompleted, soundEnabled }) {
  const [currentTask, setCurrentTask] = useState(1);

  // Task 1 State
  const [heartClicks, setHeartClicks] = useState(0);
  const [task1Done, setTask1Done] = useState(false);

  // Task 2 State
  const [task2Done, setTask2Done] = useState(false);

  // Task 3 State
  const [favInput, setFavInput] = useState('');
  const [task3Done, setTask3Done] = useState(false);

  // Task 4 State
  const [task4Answer, setTask4Answer] = useState('');
  const [task4Done, setTask4Done] = useState(false);

  // Task 1 Click Handler
  const handleTask1Click = () => {
    playHeartClick(soundEnabled);
    if (heartClicks + 1 >= 5) {
      setHeartClicks(5);
      setTask1Done(true);
      playCelebrateChime(soundEnabled);
      setTimeout(() => setCurrentTask(2), 1200);
    } else {
      setHeartClicks((prev) => prev + 1);
    }
  };

  // Task 2 Hidden Heart Click Handler
  const handleTask2Click = () => {
    playHeartClick(soundEnabled);
    setTask2Done(true);
    playCelebrateChime(soundEnabled);
    setTimeout(() => setCurrentTask(3), 1500);
  };

  // Task 3 Submit Handler
  const handleTask3Submit = (e) => {
    e.preventDefault();
    playHeartClick(soundEnabled);
    if (favInput.trim().toLowerCase() === 'you') {
      setTask3Done(true);
      playCelebrateChime(soundEnabled);
      setTimeout(() => setCurrentTask(4), 1400);
    }
  };

  // Task 4 Option Handler
  const handleTask4Click = (option) => {
    playHeartClick(soundEnabled);
    setTask4Answer(option);
    setTask4Done(true);
    playCelebrateChime(soundEnabled);
    setTimeout(() => {
      onAllTasksCompleted();
    }, 2000);
  };

  return (
    <section className="tasks-section">
      <motion.div
        className="tasks-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="tasks-badge font-serif">Interactive Challenges</div>
        <h2 className="tasks-title font-serif text-gradient">
          Before the final surprise...
        </h2>
        <p className="tasks-subtitle">
          I have a few tiny challenges for you.
        </p>
      </motion.div>

      <div className="tasks-container glass-card">
        {/* Progress Dots */}
        <div className="task-stepper">
          {[1, 2, 3, 4].map((step) => {
            const isCompleted =
              (step === 1 && task1Done) ||
              (step === 2 && task2Done) ||
              (step === 3 && task3Done) ||
              (step === 4 && task4Done);
            const isCurrent = currentTask === step;

            return (
              <div
                key={step}
                className={`step-dot ${isCompleted ? 'completed' : ''} ${
                  isCurrent ? 'current' : ''
                }`}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : step}
              </div>
            );
          })}
        </div>

        {/* TASK 1 */}
        {currentTask === 1 && (
          <motion.div
            className="task-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="task-name font-serif">Task 01</h3>
            <p className="task-instruction">Tap the heart 5 times ❤️</p>

            <motion.button
              className="heart-tap-btn"
              onClick={handleTask1Click}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.85 }}
            >
              <Heart
                size={70}
                fill={heartClicks > 0 ? '#FF4F81' : 'none'}
                color="#FF4F81"
              />
            </motion.button>

            <div className="task-counter font-serif">{heartClicks} / 5</div>

            {task1Done && (
              <motion.div
                className="task-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>Okay... you passed ❤️</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TASK 2 */}
        {currentTask === 2 && (
          <motion.div
            className="task-box relative-task"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="task-name font-serif">Task 02</h3>
            <p className="task-instruction">Find the hidden heart 👀</p>
            <p className="task-hint">(It's hiding somewhere inside this box...)</p>

            <div className="hidden-heart-playground">
              <span className="decoy d1">🌸</span>
              <span className="decoy d2">⭐</span>
              <span className="decoy d3">✨</span>

              {/* Secret hidden heart */}
              <motion.div
                className="secret-hidden-heart"
                onClick={handleTask2Click}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={20} fill="#FF4F81" color="#FF4F81" />
              </motion.div>
            </div>

            {task2Done && (
              <motion.div
                className="task-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>You found it ❤️</p>
                <p className="sub-quote">
                  "Just like you somehow found your way into my heart."
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TASK 3 */}
        {currentTask === 3 && (
          <motion.div
            className="task-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="task-name font-serif">Task 03</h3>
            <p className="task-instruction">Complete the sentence:</p>

            <form onSubmit={handleTask3Submit} className="task3-form">
              <div className="sentence-row">
                <span>My favorite person is</span>
                <input
                  type="text"
                  placeholder="You"
                  value={favInput}
                  onChange={(e) => setFavInput(e.target.value)}
                  className="fill-input"
                  required
                />
              </div>

              {!task3Done && (
                <button type="submit" className="task-submit-btn">
                  Submit Answer
                </button>
              )}
            </form>

            {task3Done && (
              <motion.div
                className="task-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>Obviously correct. ❤️</span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TASK 4 */}
        {currentTask === 4 && (
          <motion.div
            className="task-box"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="task-name font-serif">Task 04</h3>
            <p className="task-instruction">Who is cuter? 🧐</p>

            <div className="quiz-options">
              <button
                className={`quiz-btn ${task4Answer === 'Me' ? 'selected' : ''}`}
                onClick={() => handleTask4Click('Me')}
                disabled={task4Done}
              >
                Me 😎
              </button>
              <button
                className={`quiz-btn ${task4Answer === 'You' ? 'selected' : ''}`}
                onClick={() => handleTask4Click('You')}
                disabled={task4Done}
              >
                You 🥰
              </button>
            </div>

            {task4Done && (
              <motion.div
                className="task-success-msg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p>Nice try 😂</p>
                <p className="sub-quote">The correct answer is both of us ❤️</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
