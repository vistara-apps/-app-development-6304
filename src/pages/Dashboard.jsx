import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, TrendingUp, Users } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import Card from '../components/Card'
import VotingButton from '../components/VotingButton'
import Button from '../components/Button'
import { SkeletonCard, SkeletonText } from '../components/Skeleton'

export default function Dashboard() {
  const { state } = useApp()
  const { ideas, user } = state
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading state (in a real app, this would be based on actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  // Calculate vote counts for ideas
  const getVoteCounts = (votes) => {
    const upVotes = votes.filter(vote => vote.voteType === 'up').length
    const downVotes = votes.filter(vote => vote.voteType === 'down').length
    return { upVotes, downVotes, total: upVotes - downVotes }
  }

  // Sort ideas by vote score
  const sortedIdeas = ideas
    .map(idea => ({
      ...idea,
      voteCounts: getVoteCounts(idea.votes)
    }))
    .sort((a, b) => b.voteCounts.total - a.voteCounts.total)

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="h-12 w-3/4 mx-auto bg-surface/50 rounded-md animate-pulse" />
          <div className="h-20 w-2/3 mx-auto bg-surface/50 rounded-md animate-pulse" />
          <div className="h-10 w-48 mx-auto bg-surface/50 rounded-md animate-pulse mt-4" />
        </div>

        {/* Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Card.Content className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-surface/50 rounded-lg animate-pulse">
                    <div className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="h-6 w-16 bg-surface/50 rounded-md animate-pulse" />
                    <div className="h-4 w-24 bg-surface/50 rounded-md animate-pulse mt-2" />
                  </div>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>
        
        {/* Ideas List Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-surface/50 rounded-md animate-pulse" />
            <div className="h-10 w-24 bg-surface/50 rounded-md animate-pulse" />
          </div>
          
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="display">Transform Ideas into Reality</h1>
        <p className="body text-text-secondary max-w-2xl mx-auto">
          Share your ideas, get community feedback, and generate AI-powered previews 
          to validate your concepts before building.
        </p>
        <Link to="/create">
          <Button size="lg" className="mt-4">
            <Plus className="h-5 w-5 mr-2" />
            Create New Idea
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">{ideas.length}</p>
                <p className="text-sm text-text-secondary">Total Ideas</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-accent/20 rounded-lg">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {ideas.reduce((acc, idea) => acc + idea.votes.length, 0)}
                </p>
                <p className="text-sm text-text-secondary">Total Votes</p>
              </div>
            </div>
          </Card.Content>
        </Card>

        <Card>
          <Card.Content className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Plus className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-text-primary">
                  {sortedIdeas.filter(idea => idea.voteCounts.total > 0).length}
                </p>
                <p className="text-sm text-text-secondary">Popular Ideas</p>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* Ideas List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="h2">Your Ideas</h2>
          <Link to="/create">
            <Button variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              New Idea
            </Button>
          </Link>
        </div>

        {sortedIdeas.length === 0 ? (
          <Card>
            <Card.Content className="p-12 text-center">
              <div className="space-y-4">
                <div className="mx-auto w-24 h-24 bg-surface rounded-full flex items-center justify-center">
                  <Plus className="h-12 w-12 text-text-secondary" />
                </div>
                <h3 className="h2">No ideas yet</h3>
                <p className="text-text-secondary">
                  Start by creating your first idea to get community feedback and generate AI previews.
                </p>
                <Link to="/create">
                  <Button>Create Your First Idea</Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        ) : (
          <div className="grid gap-6">
            {sortedIdeas.map((idea) => (
              <Card key={idea.ideaId} variant="interactive">
                <Link to={`/idea/${idea.ideaId}`}>
                  <Card.Content className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex flex-col items-center space-y-1">
                        <VotingButton 
                          variant="up" 
                          count={idea.voteCounts.upVotes}
                        />
                        <VotingButton 
                          variant="down" 
                          count={idea.voteCounts.downVotes}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="h2 text-text-primary">{idea.title}</h3>
                          <p className="text-text-secondary mt-2 line-clamp-3">
                            {idea.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-text-secondary">
                          <span>
                            {new Date(idea.createdAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>{idea.votes.length} votes</span>
                          <span>•</span>
                          <span 
                            className={
                              idea.voteCounts.total > 0 
                                ? 'text-accent' 
                                : idea.voteCounts.total < 0 
                                ? 'text-red-400' 
                                : 'text-text-secondary'
                            }
                          >
                            Score: {idea.voteCounts.total > 0 ? '+' : ''}{idea.voteCounts.total}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card.Content>
                </Link>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
