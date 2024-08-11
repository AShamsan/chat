'use client'

import { Box, Button, Stack, TextField } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm the Headstarter support assistant. How can I help you today?",
    },
  ])

  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Hardcoded questions and answers
  const faq = {
    "Hello": "Hi! I'm the Headstarter support assistant. How can I help you today?",
    "How many tracks does Headstarter have?": "HeadStarter has Three tracks: A, B, and C",
    "What is the goal of each track?": "Track A Goal: Final project to get 1000 people on waitlist, 1000 accounts created, or $1000 in revenue.\n\n\
    Track B Goal:Final project that takes a startup’s current backlog and builds it meeting business requirements.\n\n\
    Track C Goal: Final project with an accepted PR from an open source community",
    "What is Headstarter?": "Headstarter Summer Fellow. This is a 7-week software engineering fellowship. The program will consist of building 5 AI projects, 5 weekend hackathons, 1 final project with 1000+ users, interview prep, resume reviews and feedback from real software engineers.",
    "How can I sign up?": "You can sign up by visiting the registration page on our website and following the instructions.",
    "What services do you offer?": "We offer a range of services including career guidance, skill development resources, and mentorship programs.",
    "What is the requirements to join HeadStarter?": "Applicants are required to be proficient in at least one programming language and able to allocate 20 hours a week to the fellowship. We anticipate high demand for the limited seats available and want to ensure selected fellows are fully present and maximize the benefits of the program.",
    "Give me the link to apply!": "Apply here: https://apply.headstarter.co/",

  }

  const getResponse = (userMessage) => {
    // Find a matching response or return a default message
    return faq[userMessage] || "I'm sorry, I don't have an answer to that question. Please try asking something else.";
  }

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true)

    const userMessage = message.trim();
    const assistantMessage = getResponse(userMessage);

    setMessages((messages) => [
      ...messages,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: assistantMessage },
    ])

    setMessage('')
    setIsLoading(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={'column'}
        width="500px"
        height="700px"
        border="1px solid black"
        p={2}
        spacing={3}
      >
        <Stack
          direction={'column'}
          spacing={2}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant' ? 'primary.main': 'secondary.main'
                }
                color="white"
                borderRadius={18}
                p={4}
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            InputProps={{
              sx: { color: 'white' }, // Change text color here
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
