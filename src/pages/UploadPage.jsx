import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, Sparkles, Image as ImageIcon } from 'lucide-react'

function UploadPage() {
  const [childName, setChildName] = useState('')
  const [childGender, setChildGender] = useState('')
  const [childPhoto, setChildPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [storyPrompt, setStoryPrompt] = useState('')
  const navigate = useNavigate()

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setChildPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setChildPhoto(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (childName && childGender && childPhoto && storyPrompt) {
      navigate('/story', {
        state: {
          childName,
          childGender,
          childPhoto: photoPreview,
          storyPrompt
        }
      })
    }
  }

  const examplePrompts = [
    "My child refuses to eat vegetables",
    "My child is afraid of the dark at bedtime",
    "My child doesn't want to share toys with siblings",
    "My child learned to ride a bike today",
    "My child made a new friend at school"
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-purple-600 mr-2" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              KidStory
            </h1>
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Create personalized AI-powered stories featuring your child as the hero
          </p>
        </div>

        {/* Main Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Child Name Input */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Child's Name
              </label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter your child's name"
                className="input-field"
                required
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Gender
              </label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="boy"
                    checked={childGender === 'boy'}
                    onChange={(e) => setChildGender(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                    childGender === 'boy' 
                      ? 'border-purple-600 bg-purple-50 shadow-md' 
                      : 'border-gray-300 hover:border-purple-400'
                  }`}>
                    <div className="text-3xl mb-2">👦</div>
                    <div className="font-semibold text-gray-800">Boy</div>
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="girl"
                    checked={childGender === 'girl'}
                    onChange={(e) => setChildGender(e.target.value)}
                    className="sr-only"
                    required
                  />
                  <div className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                    childGender === 'girl' 
                      ? 'border-pink-600 bg-pink-50 shadow-md' 
                      : 'border-gray-300 hover:border-pink-400'
                  }`}>
                    <div className="text-3xl mb-2">👧</div>
                    <div className="font-semibold text-gray-800">Girl</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                Upload Photo
              </label>
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-3 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-500 transition-all duration-300 cursor-pointer bg-purple-50 bg-opacity-50"
              >
                {photoPreview ? (
                  <div className="space-y-4">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="max-h-64 mx-auto rounded-xl shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setChildPhoto(null)
                        setPhotoPreview(null)
                      }}
                      className="text-purple-600 hover:text-purple-800 font-medium"
                    >
                      Change Photo
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      required
                    />
                    <div className="flex flex-col items-center space-y-4">
                      <div className="bg-purple-100 p-6 rounded-full">
                        <Upload className="w-12 h-12 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-gray-700">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </label>
                )}
              </div>
            </div>

            {/* Story Prompt */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                What's the story about?
              </label>
              <textarea
                value={storyPrompt}
                onChange={(e) => setStoryPrompt(e.target.value)}
                placeholder="Describe a challenge your child is facing or an achievement to celebrate..."
                className="input-field min-h-32 resize-none"
                required
              />
              
              {/* Example Prompts */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2 font-medium">Need inspiration? Try these:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setStoryPrompt(prompt)}
                      className="text-sm bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors duration-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={!childName || !childGender || !childPhoto || !storyPrompt}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Generate Story</span>
              </button>
            </div>
          </form>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Personalized Images</h3>
            <p className="text-gray-600">Your child becomes the star with AI-generated illustrations</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">AI-Powered Stories</h3>
            <p className="text-gray-600">Unique narratives crafted for your child's situation</p>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-pink-500 to-red-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2">Positive Messages</h3>
            <p className="text-gray-600">Stories that build confidence and celebrate growth</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
