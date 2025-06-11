# Portfolio Configuration Guide

This portfolio is completely customizable through the `portfolio-config.json` file. Simply edit this file to personalize the portfolio with your own information.

## 📁 File Structure

```
data/
└── portfolio-config.json    # Main configuration file
```

## 🔧 Configuration Sections

### 1. Personal Information (`personal`)

```json
{
  "personal": {
    "name": "Your Full Name",
    "title": "Your Job Title",
    "subtitle": "Your Specialization",
    "description": "Brief description of your expertise",
    "location": "Your City, Country",
    "email": "your.email@example.com",
    "phone": "+1 234 567 8900",
    "profileImage": "/your-image.jpg",
    "cv": "/your-cv.pdf",
    "bio": [
      "First paragraph of your bio...",
      "Second paragraph of your bio...",
      "Third paragraph of your bio..."
    ],
    "socialLinks": {
      "github": "https://github.com/yourusername",
      "linkedin": "https://linkedin.com/in/yourusername",
      "email": "mailto:your.email@example.com",
      "twitter": "https://twitter.com/yourusername"
    }
  }
}
```

**Required Files:**
- Add your profile image to `/public/your-image.jpg`
- Add your CV/resume to `/public/your-cv.pdf`

### 2. Skills (`skills`)

Organize your skills into four categories with proficiency levels (0-100):

```json
{
  "skills": {
    "frontend": [
      { "name": "React", "level": 95 },
      { "name": "TypeScript", "level": 88 }
    ],
    "backend": [
      { "name": "Node.js", "level": 85 },
      { "name": "Python", "level": 78 }
    ],
    "tools": [
      { "name": "Git", "level": 90 },
      { "name": "Docker", "level": 75 }
    ],
    "database": [
      { "name": "MongoDB", "level": 80 },
      { "name": "PostgreSQL", "level": 75 }
    ]
  }
}
```

### 3. Projects (`projects`)

Add your projects with detailed information:

```json
{
  "projects": [
    {
      "id": "unique-id",
      "title": "Project Title",
      "description": "Short description for the card",
      "longDescription": "Detailed description for the modal",
      "category": "web", // "web", "mobile", "design", "other"
      "image": "https://example.com/project-image.jpg",
      "tags": ["React", "TypeScript", "Tailwind CSS"],
      "links": {
        "demo": "https://your-demo-link.com",
        "github": "https://github.com/yourusername/project"
      },
      "features": [
        "Feature 1",
        "Feature 2",
        "Feature 3"
      ]
    }
  ]
}
```

**Image Sources:**
- Use Pexels URLs for stock photos
- Use your own hosted images
- Ensure images are high quality and relevant

### 4. Testimonials (`testimonials`)

Add client testimonials and feedback:

```json
{
  "testimonials": [
    {
      "id": "unique-id",
      "name": "Client Name",
      "role": "Their Job Title",
      "company": "Company Name",
      "content": "The testimonial content...",
      "rating": 5, // 1-5 stars
      "createdAt": "2024-01-15"
    }
  ]
}
```

### 5. Contact Information (`contact`)

Customize the contact section:

```json
{
  "contact": {
    "title": "Get In Touch",
    "description": "Your contact section description...",
    "officeHours": {
      "weekdays": "Monday - Friday",
      "weekdaysTime": "9:00 AM - 5:00 PM GMT",
      "saturday": "Saturday",
      "saturdayTime": "By appointment",
      "sunday": "Sunday",
      "sundayTime": "Closed"
    }
  }
}
```

### 6. SEO Settings (`seo`)

Configure SEO metadata:

```json
{
  "seo": {
    "title": "Your Name | Portfolio Title",
    "description": "Portfolio description for search engines",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "author": "Your Name",
    "siteUrl": "https://yourportfolio.com",
    "twitterHandle": "@yourusername"
  }
}
```

### 7. Navigation (`navigation`)

Customize the navigation menu:

```json
{
  "navigation": [
    { "label": "Home", "href": "#home" },
    { "label": "About", "href": "#about" },
    { "label": "Skills", "href": "#skills" },
    { "label": "Projects", "href": "#projects" },
    { "label": "Testimonials", "href": "#testimonials" },
    { "label": "Contact", "href": "#contact" }
  ]
}
```

## 🚀 Quick Setup Guide

1. **Clone the repository**
2. **Edit `data/portfolio-config.json`** with your information
3. **Add your files to `/public/`:**
   - Profile image (e.g., `profile.jpg`)
   - CV/Resume (e.g., `cv.pdf`)
4. **Update the file paths** in the config to match your files
5. **Run the development server:** `npm run dev`

## 💡 Tips

### Images
- **Profile Image**: Use a professional headshot, square aspect ratio works best
- **Project Images**: Use high-quality images that represent your projects well
- **Recommended Size**: 800x600px or larger for project images

### Content Writing
- **Bio**: Keep paragraphs concise and engaging
- **Project Descriptions**: Focus on the problem solved and technologies used
- **Testimonials**: Use real feedback when possible, or create realistic examples

### Skills
- **Be Honest**: Rate your skills accurately (70% = proficient, 90%+ = expert)
- **Categories**: Feel free to rename categories to match your expertise
- **Relevance**: Include skills that are relevant to your target roles

### Projects
- **Quality over Quantity**: 4-6 strong projects are better than many weak ones
- **Variety**: Show different types of projects and technologies
- **Links**: Ensure demo links work and GitHub repos are public

## 🔄 Making Changes

After editing the configuration file:

1. **Save the file**
2. **Refresh your browser** (changes are applied automatically in development)
3. **Test all sections** to ensure everything displays correctly
4. **Check responsive design** on different screen sizes

## 🎨 Customization Beyond Config

While most customization can be done through the config file, you can also:

- **Modify colors** in `tailwind.config.ts`
- **Change fonts** in `app/layout.tsx`
- **Add new sections** by creating components in `components/sections/`
- **Customize animations** in individual component files

## 📝 Validation

The configuration is type-checked to ensure:
- All required fields are present
- Data types are correct
- Links are properly formatted
- Skill levels are within valid ranges (0-100)

If you encounter TypeScript errors, check that your configuration matches the expected structure.

## 🆘 Troubleshooting

**Common Issues:**

1. **Images not loading**: Check file paths and ensure images exist in `/public/`
2. **TypeScript errors**: Verify your JSON syntax and data types
3. **Missing sections**: Ensure all required fields are present in the config
4. **Broken links**: Test all external links before deployment

**Getting Help:**

- Check the console for error messages
- Refer to the example configuration
- Ensure JSON syntax is valid (use a JSON validator)

---

**Happy customizing! 🎉**