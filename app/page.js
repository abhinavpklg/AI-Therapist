'use client'
import { useState, useRef, useEffect } from "react";
import {Box, Stack, TextField, Button} from '@mui/material'

export default function Home() {
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: `Hi, I am your therapist, Dr. Grace. Let's get to know each other, What's your name?`
}])

const [message, setMessage] = useState('')
const [isLoading, setIsLoading] = useState(false)


const sendMessage = async () => {
  setIsLoading(true)
  if (!message.trim() || isLoading) return;

  setMessage('')
  setMessages((messages) => [
    ...messages,
    { role: 'user', content: message },
    { role: 'assistant', content: '' },
  ])

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = decoder.decode(value, { stream: true })
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]
        let otherMessages = messages.slice(0, messages.length - 1)
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + text },
        ]
      })
    }
  } catch (error) {
    console.error('Error:', error)
    setMessages((messages) => [
      ...messages,
      { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again later." },
    ])
  }
  setIsLoading(false)
}
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const messagesEndRef = useRef(null)

const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

useEffect(() => {
  scrollToBottom()
}, [messages])

return (
  <Box
    width="100vw"
    height="100vh"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    style={{ 
      backgroundImage: 'url("/pixelart.png")', 
      backgroundSize: 'cover'
    }}
  >
    <Stack
      direction={'column'}
      width="60%"
      height="700px"
      p={2}
      spacing={3}
      style={{ backdropFilter: 'blur(0.5px)', backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
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
                message.role === 'assistant'
                  ? 'rgba(255, 179, 186, 0.9)'
                  : 'rgba(179, 229, 252, 0.9)'
              }
              color="black"
              p={3}
              borderRadius={16}
            >
              {message.content}
            </Box>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
      <Stack 
      direction={'row'} 
      spacing={2}
      >
        <TextField
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          style={{ backgroundColor: 'rgba(255, 255, 255, 1)' }}

        />
        <Button 
        variant="contained" 
        onClick={sendMessage} 
        disabled={isLoading}
        sx={{ backgroundColor: '#4CAF50', color: 'white', '&:hover': { backgroundColor: '#388E3C' } }}
        >
        {isLoading ? 'Sending...' : 'Send'}
        </Button>
      </Stack>
    </Stack>
  </Box>
)
}
