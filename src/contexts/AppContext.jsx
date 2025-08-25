import React, { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

// Initial state
const initialState = {
  user: {
    userId: 'user-1',
    username: 'demo_user',
    email: 'demo@ideaforge.com',
    createdAt: new Date().toISOString()
  },
  ideas: [
    {
      ideaId: 'idea-1',
      userId: 'user-1',
      title: 'AI-Powered Recipe Generator',
      description: 'An app that generates personalized recipes based on dietary preferences, available ingredients, and cooking time constraints.',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      votes: [
        { voteId: 'vote-1', userId: 'user-2', voteType: 'up' },
        { voteId: 'vote-2', userId: 'user-3', voteType: 'up' },
        { voteId: 'vote-3', userId: 'user-4', voteType: 'down' }
      ]
    },
    {
      ideaId: 'idea-2',
      userId: 'user-1',
      title: 'Smart Plant Care Assistant',
      description: 'IoT-enabled plant monitoring system with mobile app integration for automated watering and care reminders.',
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T15:45:00Z',
      votes: [
        { voteId: 'vote-4', userId: 'user-2', voteType: 'up' },
        { voteId: 'vote-5', userId: 'user-3', voteType: 'up' }
      ]
    }
  ],
  featureRequests: [
    {
      featureId: 'feature-1',
      ideaId: 'idea-1',
      description: 'Voice input for recipe preferences',
      createdAt: '2024-01-15T11:00:00Z',
      votes: [
        { voteId: 'vote-6', userId: 'user-2', voteType: 'up' }
      ]
    },
    {
      featureId: 'feature-2',
      ideaId: 'idea-1',
      description: 'Integration with grocery delivery services',
      createdAt: '2024-01-15T11:15:00Z',
      votes: [
        { voteId: 'vote-7', userId: 'user-3', voteType: 'up' },
        { voteId: 'vote-8', userId: 'user-4', voteType: 'up' }
      ]
    }
  ],
  generatedPreviews: {}
}

// Action types
const actionTypes = {
  ADD_IDEA: 'ADD_IDEA',
  ADD_FEATURE_REQUEST: 'ADD_FEATURE_REQUEST',
  ADD_VOTE: 'ADD_VOTE',
  SET_GENERATED_PREVIEW: 'SET_GENERATED_PREVIEW'
}

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_IDEA:
      return {
        ...state,
        ideas: [...state.ideas, action.payload]
      }
    
    case actionTypes.ADD_FEATURE_REQUEST:
      return {
        ...state,
        featureRequests: [...state.featureRequests, action.payload]
      }
    
    case actionTypes.ADD_VOTE:
      const { targetType, targetId, vote } = action.payload
      
      if (targetType === 'idea') {
        return {
          ...state,
          ideas: state.ideas.map(idea => 
            idea.ideaId === targetId 
              ? { ...idea, votes: [...idea.votes, vote] }
              : idea
          )
        }
      } else if (targetType === 'feature') {
        return {
          ...state,
          featureRequests: state.featureRequests.map(feature => 
            feature.featureId === targetId 
              ? { ...feature, votes: [...feature.votes, vote] }
              : feature
          )
        }
      }
      return state
    
    case actionTypes.SET_GENERATED_PREVIEW:
      return {
        ...state,
        generatedPreviews: {
          ...state.generatedPreviews,
          [action.payload.id]: action.payload.preview
        }
      }
    
    default:
      return state
  }
}

// Provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  const value = {
    state,
    dispatch,
    actionTypes
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook
export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}