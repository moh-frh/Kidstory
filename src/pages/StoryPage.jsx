import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Loader2, Sparkles } from 'lucide-react'
import OpenAI from 'openai'

function StoryPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { childName, childGender, childPhoto, storyPrompt } = location.state || {}

  const [loading, setLoading] = useState(true)
  const [story, setStory] = useState(null)
  const [storyImage, setStoryImage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!childName || !childGender || !childPhoto || !storyPrompt) {
      navigate('/')
      return
    }

    generateStory()
  }, [])

  const generateStory = async () => {
    try {
      setLoading(true)
      setError(null)

      const apiKey = import.meta.env.VITE_OPENAI_API_KEY
      
      if (!apiKey) {
        setError('Please set your OpenAI API key in the .env file')
        setLoading(false)
        return
      }

      const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Note: In production, API calls should be made from a backend
      })

      // Generate story text
      const storyResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a creative children's story writer. Create a complete story for a ${childGender} named ${childName}. 
            The story should be positive, age-appropriate (2-8 years old), and address the following situation: ${storyPrompt}.
            
            IMPORTANT: Use appropriate pronouns (${childGender === 'boy' ? 'he/him/his' : 'she/her/hers'}) throughout the story.
            
            You must respond with ONLY valid JSON. No additional text before or after the JSON.
            
            Format your response as a JSON object with exactly this structure:
            {
              "story": "the complete story text (5-8 paragraphs, engaging and age-appropriate)",
              "imagePrompt": "a detailed description for generating ONE main illustration"
            }
            
            Make sure the story has a clear beginning, middle, and end with a positive resolution.
            Remember: Return ONLY the JSON object, nothing else.`
          },
          {
            role: 'user',
            content: `Create a story about ${childName} and this situation: ${storyPrompt}`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })

      let storyData
      try {
        const responseContent = storyResponse.choices[0].message.content.trim()
        storyData = JSON.parse(responseContent)
      } catch (parseError) {
        console.error('JSON parse error:', parseError)
        throw new Error('Failed to parse story response. Please try again.')
      }

      if (!storyData.story || !storyData.imagePrompt) {
        throw new Error('Invalid story format received. Please try again.')
      }

      setStory(storyData.story)

      // Generate cartoon image using GPT-4o vision (similar to ChatGPT's approach)
      try {
        const imageResponse = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Convert this photo into a cute cartoon character illustration. Use a children's book style with bold black outlines, flat colors, large expressive eyes, and a friendly smile. Keep the child's unique features (hair, skin tone, clothing) but make it look like a cartoon/animated character. Set against a soft pastel pink background."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: childPhoto
                  }
                }
              ]
            }
          ],
          max_tokens: 300
        })

        // GPT-4o doesn't generate images directly, so we need to use DALL-E 3 with the description
        const cartoonDescription = imageResponse.choices[0].message.content
        
        // Now generate with DALL-E 3
        const dalleResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: `${cartoonDescription}. Create this as a cartoon portrait with thick black outlines, flat colors, large expressive cartoon eyes, simplified features, and a soft pastel pink background. Children's book illustration style.`,
          n: 1,
          size: "1024x1024",
          quality: "standard",
        })

        setStoryImage(dalleResponse.data[0].url)
      } catch (imgError) {
        console.error('Error generating image:', imgError)
        setStoryImage(null)
      }

      setLoading(false)
    } catch (err) {
      console.error('Error generating story:', err)
      setError(err.message || 'Failed to generate story. Please try again.')
      setLoading(false)
    }
  }

  const handleDownload = () => {
    // Create a simple download of the story
    const storyText = `${childName}'s Adventure\n\n${story}`

    const blob = new Blob([storyText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${childName}-story.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!childName) {
    return null
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Create Another Story</span>
          </button>
          
          {!loading && story && (
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 btn-secondary"
            >
              <Download className="w-5 h-5" />
              <span>Download Story</span>
            </button>
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {childName}'s Adventure
          </h1>
          <p className="text-lg text-gray-600">A personalized story just for you!</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="card text-center py-16">
            <div className="flex flex-col items-center space-y-6">
              <div className="relative">
                <Loader2 className="w-16 h-16 text-purple-600 animate-spin" />
                <Sparkles className="w-8 h-8 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Creating Your Story...
                </h2>
                <p className="text-gray-600">
                  Our AI is crafting a magical adventure for {childName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="card text-center py-12">
            <div className="text-red-600 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Story Display */}
        {!loading && !error && story && (
          <div className="max-w-4xl mx-auto">
            <div className="card">
              {/* Story Image */}
              {storyImage ? (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={storyImage}
                    alt={`${childName}'s story illustration`}
                    className="w-full h-auto"
                  />
                </div>
              ) : (
                <div className="mb-8 aspect-video rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                    <p className="text-gray-600">Image unavailable</p>
                  </div>
                </div>
              )}
              
              {/* Story Text */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-800 leading-relaxed space-y-4 text-lg">
                  {story.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        {!loading && !error && story && (
          <div className="mt-12 text-center card">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Love this story?
            </h3>
            <p className="text-gray-600 mb-6">
              Create more personalized adventures for {childName}!
            </p>
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
            >
              Create Another Story
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StoryPage
