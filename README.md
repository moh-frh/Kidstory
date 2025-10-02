# KidStory - AI-Powered Personalized Children's Stories

A beautiful React application that generates personalized children's stories with AI-generated illustrations, similar to Naami.app. Upload your child's photo, describe a situation or achievement, and watch as AI creates a unique 6-panel story featuring your child as the hero!

## Features

- 📸 **Photo Upload**: Upload your child's photo with drag-and-drop support
- ✨ **AI Story Generation**: Powered by OpenAI GPT-4 for creative, age-appropriate narratives
- 🎨 **AI Illustrations**: DALL-E 3 generates beautiful, personalized images for each story panel
- 🎯 **Positive Messages**: Stories focus on growth, confidence, and positive reinforcement
- 📱 **Responsive Design**: Beautiful UI that works on all devices
- 🌈 **Modern UI**: Built with TailwindCSS and Lucide icons

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone or navigate to the project directory:
```bash
cd d:/___developement/Kidstory
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

4. Add your OpenAI API key to the `.env` file:
```
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and paste it in your `.env` file

**Note**: Using DALL-E 3 and GPT-4 will incur costs. Check OpenAI's pricing page for current rates.

## Running the Application

Start the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## How to Use

1. **Upload Page** (`/`):
   - Enter your child's name
   - Upload a photo (drag-and-drop or click to browse)
   - Describe a situation or achievement
   - Click "Generate Story"

2. **Story Page** (`/story`):
   - Watch as AI generates a 6-panel story
   - Each panel includes an AI-generated illustration and text
   - Download the story text when complete
   - Create another story with the back button

## Project Structure

```
Kidstory/
├── src/
│   ├── pages/
│   │   ├── UploadPage.jsx    # Photo upload and story prompt page
│   │   └── StoryPage.jsx     # AI story generation and display
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles with Tailwind
├── public/                   # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── .env                    # Environment variables (not in git)
```

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **OpenAI API** - GPT-4 for story generation, DALL-E 3 for images

## Important Notes

### Security Warning
⚠️ **The current implementation uses the OpenAI API directly from the browser** (`dangerouslyAllowBrowser: true`). This is **NOT recommended for production** as it exposes your API key.

**For production, you should:**
1. Create a backend API (Node.js, Python, etc.)
2. Move all OpenAI API calls to the backend
3. Have the frontend call your backend API instead
4. Store the OpenAI API key securely on the server

### API Costs
- Each story generation uses GPT-3.5-turbo (text) and DALL-E 3 (1 image)
- Approximate cost per story: $0.05 - $0.10 (varies by usage)
- GPT-3.5-turbo: ~$0.002 per story
- DALL-E 3: ~$0.04 per image
- Monitor your OpenAI usage dashboard to track costs

### Free Alternatives
If you want to avoid OpenAI costs entirely, you can use free models:
- **Groq API** (free tier): Use Llama 3 or Mixtral for story generation
- **Hugging Face Inference API** (free tier): Various open-source models
- **Google Gemini** (free tier): Gemini 1.5 Flash for text generation
- Note: Free image generation is limited; consider using stock illustrations or simpler image APIs

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Customization

### Change Color Scheme
Edit `tailwind.config.js` to modify the color palette:
```javascript
colors: {
  primary: {
    // Your custom colors
  }
}
```

### Modify Story Length
In `StoryPage.jsx`, change the number of panels in the system prompt (currently set to 6).

### Adjust AI Parameters
In `StoryPage.jsx`, modify:
- `temperature` - Controls creativity (0.0-1.0)
- `model` - Switch between GPT models
- Image `size` - Change image dimensions
- Image `quality` - "standard" or "hd"

## Troubleshooting

### "Please set your OpenAI API key" error
- Make sure `.env` file exists in the root directory
- Verify the API key is correctly formatted
- Restart the dev server after adding the `.env` file

### Images not generating
- Check your OpenAI account has sufficient credits
- Verify DALL-E 3 access is enabled for your account
- Check browser console for specific error messages

### Slow generation
- DALL-E 3 images take 10-30 seconds each
- A complete 6-panel story may take 2-5 minutes
- This is normal behavior for AI image generation

## Future Enhancements

- [ ] Backend API for secure OpenAI integration
- [ ] User authentication and story library
- [ ] Multiple story templates and themes
- [ ] Export stories as PDF or printable format
- [ ] Share stories via link
- [ ] Multiple language support
- [ ] Voice narration for stories

## License

This project is for educational purposes. Please ensure you comply with OpenAI's usage policies when using their API.

## Support

For issues or questions, please check:
- OpenAI API documentation: https://platform.openai.com/docs
- React documentation: https://react.dev
- Vite documentation: https://vitejs.dev

---

Made with ❤️ for parents and children everywhere
