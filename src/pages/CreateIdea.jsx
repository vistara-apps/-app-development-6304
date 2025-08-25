import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { useToast } from '../contexts/ToastContext'
import Card from '../components/Card'
import InputField from '../components/InputField'
import Button from '../components/Button'

export default function CreateIdea() {
  const navigate = useNavigate()
  const { state, dispatch, actionTypes } = useApp()
  const { addToast } = useToast()
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })
  const [features, setFeatures] = useState([''])
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const addFeature = () => {
    setFeatures(prev => [...prev, ''])
  }

  const removeFeature = (index) => {
    if (features.length > 1) {
      setFeatures(prev => prev.filter((_, i) => i !== index))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      addToast('Please fix the errors in the form', 'error')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Create new idea
      const newIdea = {
        ideaId: `idea-${Date.now()}`,
        userId: state.user.userId,
        title: formData.title.trim(),
        description: formData.description.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        votes: []
      }
      
      dispatch({
        type: actionTypes.ADD_IDEA,
        payload: newIdea
      })
      
      // Add feature requests
      const validFeatures = features.filter(feature => feature.trim())
      validFeatures.forEach(feature => {
        const newFeature = {
          featureId: `feature-${Date.now()}-${Math.random()}`,
          ideaId: newIdea.ideaId,
          description: feature.trim(),
          createdAt: new Date().toISOString(),
          votes: []
        }
        
        dispatch({
          type: actionTypes.ADD_FEATURE_REQUEST,
          payload: newFeature
        })
      })
      
      // Show success toast
      addToast('Idea created successfully!', 'success')
      
      // Navigate to the new idea
      navigate(`/idea/${newIdea.ideaId}`)
    } catch (error) {
      console.error('Error creating idea:', error)
      addToast('Failed to create idea. Please try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="h1">Create New Idea</h1>
      </div>

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit}>
          <Card.Content className="p-6 space-y-6">
            <InputField
              label="Idea Title"
              placeholder="Enter a compelling title for your idea"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={errors.title}
            />
            
            <InputField
              variant="textarea"
              label="Description"
              placeholder="Describe your idea in detail. What problem does it solve? Who is your target audience?"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              error={errors.description}
              rows={6}
            />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-text-primary">
                  Feature Requests (Optional)
                </label>
                <Button 
                  type="button"
                  variant="secondary" 
                  size="sm"
                  onClick={addFeature}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <InputField
                      placeholder={`Feature ${index + 1} (e.g., "Dark mode support")`}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1"
                    />
                    {features.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeFeature(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-text-secondary">
                Add specific features you're considering. Your audience can vote on these to help prioritize development.
              </p>
            </div>
          </Card.Content>
          
          <Card.Footer>
            <div className="flex items-center justify-end space-x-3">
              <Button 
                type="button"
                variant="secondary"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                loading={isSubmitting}
              >
                Create Idea
              </Button>
            </div>
          </Card.Footer>
        </form>
      </Card>
    </div>
  )
}
