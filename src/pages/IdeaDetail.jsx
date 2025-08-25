import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Zap, Share2 } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { generateUIPreview } from '../services/aiService'
import Card from '../components/Card'
import VotingButton from '../components/VotingButton'
import Button from '../components/Button'
import InputField from '../components/InputField'
import AIPreviewFrame from '../components/AIPreviewFrame'

export default function IdeaDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, dispatch, actionTypes } = useApp()
  const [newFeature, setNewFeature] = useState('')
  const [isAddingFeature, setIsAddingFeature] = useState(false)
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false)

  // Find the idea
  const idea = state.ideas.find(idea => idea.ideaId === id)
  const features = state.featureRequests.filter(feature => feature.ideaId === id)
  const generatedPreview = state.generatedPreviews[id]

  if (!idea) {
    return (
      <div className="text-center space-y-4">
        <h1 className="h1">Idea Not Found</h1>
        <p className="text-text-secondary">The idea you're looking for doesn't exist.</p>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
    )
  }

  // Calculate vote counts
  const getVoteCounts = (votes) => {
    const upVotes = votes.filter(vote => vote.voteType === 'up').length
    const downVotes = votes.filter(vote => vote.voteType === 'down').length
    return { upVotes, downVotes, total: upVotes - downVotes }
  }

  const ideaVotes = getVoteCounts(idea.votes)

  // Handle voting
  const handleVote = (targetType, targetId, voteType) => {
    const newVote = {
      voteId: `vote-${Date.now()}-${Math.random()}`,
      userId: `user-${Math.random()}`, // Simulated user
      voteType
    }

    dispatch({
      type: actionTypes.ADD_VOTE,
      payload: { targetType, targetId, vote: newVote }
    })
  }

  // Handle adding feature
  const handleAddFeature = async () => {
    if (!newFeature.trim()) return

    setIsAddingFeature(true)
    
    try {
      const feature = {
        featureId: `feature-${Date.now()}`,
        ideaId: id,
        description: newFeature.trim(),
        createdAt: new Date().toISOString(),
        votes: []
      }

      dispatch({
        type: actionTypes.ADD_FEATURE_REQUEST,
        payload: feature
      })

      setNewFeature('')
    } catch (error) {
      console.error('Error adding feature:', error)
    } finally {
      setIsAddingFeature(false)
    }
  }

  // Handle AI preview generation
  const handleGeneratePreview = async () => {
    setIsGeneratingPreview(true)
    
    try {
      const preview = await generateUIPreview(idea, features)
      
      dispatch({
        type: actionTypes.SET_GENERATED_PREVIEW,
        payload: { id: idea.ideaId, preview }
      })
    } catch (error) {
      console.error('Error generating preview:', error)
    } finally {
      setIsGeneratingPreview(false)
    }
  }

  // Handle sharing
  const handleShare = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </div>
        
        <Button 
          variant="secondary"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Idea Details */}
          <Card>
            <Card.Content className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center space-y-2">
                  <VotingButton 
                    variant="up" 
                    count={ideaVotes.upVotes}
                    onClick={() => handleVote('idea', idea.ideaId, 'up')}
                  />
                  <div className="text-lg font-bold text-text-primary">
                    {ideaVotes.total}
                  </div>
                  <VotingButton 
                    variant="down" 
                    count={ideaVotes.downVotes}
                    onClick={() => handleVote('idea', idea.ideaId, 'down')}
                  />
                </div>
                
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="h1 text-text-primary">{idea.title}</h1>
                    <p className="text-sm text-text-secondary mt-2">
                      Created {new Date(idea.createdAt).toLocaleDateString()} • 
                      {idea.votes.length} votes
                    </p>
                  </div>
                  
                  <p className="body text-text-primary leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Feature Requests */}
          <Card>
            <Card.Header>
              <h2 className="h2">Feature Requests</h2>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                {features.length === 0 ? (
                  <p className="text-text-secondary text-center py-8">
                    No feature requests yet. Add the first one below!
                  </p>
                ) : (
                  features
                    .sort((a, b) => getVoteCounts(b.votes).total - getVoteCounts(a.votes).total)
                    .map((feature) => {
                      const featureVotes = getVoteCounts(feature.votes)
                      return (
                        <div key={feature.featureId} className="flex items-center space-x-4 p-4 bg-bg rounded-lg border border-border">
                          <div className="flex items-center space-x-2">
                            <VotingButton 
                              variant="up" 
                              count={featureVotes.upVotes}
                              onClick={() => handleVote('feature', feature.featureId, 'up')}
                            />
                            <span className="text-sm font-medium text-text-primary">
                              {featureVotes.total}
                            </span>
                            <VotingButton 
                              variant="down" 
                              count={featureVotes.downVotes}
                              onClick={() => handleVote('feature', feature.featureId, 'down')}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <p className="text-text-primary">{feature.description}</p>
                            <p className="text-xs text-text-secondary mt-1">
                              {new Date(feature.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )
                    })
                )}
                
                {/* Add Feature Form */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <InputField
                    placeholder="Suggest a new feature..."
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className="flex-1"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleAddFeature()
                      }
                    }}
                  />
                  <Button 
                    onClick={handleAddFeature}
                    loading={isAddingFeature}
                    disabled={!newFeature.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Preview Generator */}
          <Card>
            <Card.Header>
              <h3 className="h2">AI Preview</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4">
                <p className="text-sm text-text-secondary">
                  Generate an interactive preview of your idea using AI.
                </p>
                
                <Button 
                  onClick={handleGeneratePreview}
                  loading={isGeneratingPreview}
                  className="w-full"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Generate Preview
                </Button>
              </div>
            </Card.Content>
          </Card>

          {/* Stats */}
          <Card>
            <Card.Header>
              <h3 className="h2">Stats</h3>
            </Card.Header>
            <Card.Content>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Votes</span>
                  <span className="text-text-primary font-medium">{idea.votes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Score</span>
                  <span className={`font-medium ${
                    ideaVotes.total > 0 ? 'text-accent' : 
                    ideaVotes.total < 0 ? 'text-red-400' : 'text-text-primary'
                  }`}>
                    {ideaVotes.total > 0 ? '+' : ''}{ideaVotes.total}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Features</span>
                  <span className="text-text-primary font-medium">{features.length}</span>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* AI Preview Display */}
      {generatedPreview && (
        <Card>
          <Card.Header>
            <h3 className="h2">Generated Preview</h3>
          </Card.Header>
          <Card.Content>
            <AIPreviewFrame 
              preview={generatedPreview}
              title={`Preview for "${idea.title}"`}
            />
          </Card.Content>
        </Card>
      )}
    </div>
  )
}