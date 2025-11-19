# Skills Section - "Montaña del Stack" ✨

## Overview

The Skills Section is now complete with a unique mountain visualization metaphor! Your technical skills are organized as layers of an Andean mountain, from the foundation to the peak, representing your journey from core skills to expert-level mastery.

## What Was Built

### 1. Skills Data Structure

**File:** [app/data/skills.ts](app/data/skills.ts)

**Mountain Layers (Peak → Base):**

1. **Peak (6,000m)** - Expert Level
   - React, Next.js, TypeScript
   - Purple color (weaving-purple)

2. **Summit (5,000m)** - Advanced
   - Node.js, Tailwind CSS, PostgreSQL, GraphQL
   - Sky blue color

3. **Mid-Mountain (4,000m)** - Proficient
   - Docker, AWS, MongoDB, Redis, Prisma
   - Pink color (weaving-pink)

4. **Base (3,000m)** - Competent
   - Kubernetes, Python, CI/CD, Jest
   - Yellow color (weaving-yellow)

5. **Foundation (2,000m)** - Core Skills
   - Git, REST APIs, Figma, Agile, WebSockets
   - Terracotta color

**Each Skill Includes:**
- Name
- Level (1-5 scale)
- Icon (emoji)
- Color (for visual identity)
- Description (detailed expertise)

### 2. Mountain SVG Component

**File:** [app/components/Mountain.tsx](app/components/Mountain.tsx)

**Visual Elements:**
- 5 layered mountain sections with gradients
- Snow cap on the peak
- Animated sky background
- Sun with glow effect
- Floating clouds
- Trees on the foundation layer
- Flag at the summit
- Drop shadows for depth
- Color-coded layers matching skill data

**Animations:**
- Layers fade in from bottom to top
- Flag waves in the wind (continuous loop)
- Trees pop in with stagger
- Clouds drift horizontally
- All elements respect timing and physics

### 3. Skills Section Component

**File:** [app/components/SkillsSection.tsx](app/components/SkillsSection.tsx)

**Features:**

#### Category Filters
- All Skills (default)
- Frontend (⚛️)
- Backend (🔧)
- DevOps (🚀)

Click to filter skills by category

#### Two-Column Layout (Desktop)
- **Left:** Animated mountain SVG with legend
- **Right:** Skill layers with interactive badges

#### Skill Badges
- Icon + Name + Level dots
- Hover to see detailed tooltip
- Pop-in animation with stagger
- Scale and lift on hover
- Color-coded borders

#### Hover Tooltip (Bottom of screen)
- Shows when hovering any skill
- Displays: Icon, Name, Level (visual dots + text), Description
- Fixed position at bottom center
- Smooth fade in/out

#### Stats Footer
- Total technologies count
- Expert areas count
- Years of learning
- Passion level (100%)

#### Mountain Legend
- Color-coded layer names
- Elevation markers
- Compact, easy reference

### 4. Interactive Features

**Filtering:**
- Click category button
- Skills list updates instantly
- Empty layers hide automatically
- Mountain remains visible

**Hover Effects:**
- Skill badges scale and lift
- Tooltip appears at bottom
- Stats cards lift on hover
- Category buttons change color

**Scroll Animations:**
- Section header fades in
- Filters pop in with stagger
- Mountain slides from left
- Skills slide from right
- Layers reveal sequentially
- Stats cards pop at end

## Key Features

### Responsive Design

**Desktop (lg+):**
- 2-column layout (Mountain | Skills)
- 4-column stats grid
- Larger mountain illustration
- More spacing

**Tablet (md):**
- Stacked layout
- 2-column stats
- Medium mountain
- Adjusted text sizes

**Mobile:**
- Single column
- 2-column stats
- Compact mountain
- Touch-friendly badges

### Animations & Interactions

1. **Mountain Animations**
   - Layers build from bottom to top
   - Clouds drift across
   - Flag waves continuously
   - Trees pop in with delay

2. **Skill Animations**
   - Layers fade in sequentially
   - Badges stagger from left
   - Hover reveals tooltip
   - Filter updates smoothly

3. **Performance**
   - `useInView` for scroll triggers
   - GPU-accelerated transforms
   - Optimized SVG rendering
   - Reduced motion support

### Accessibility

- Semantic HTML structure
- Keyboard navigable filters
- Clear visual hierarchy
- Color contrast compliant
- Screen reader friendly labels
- Touch targets sized properly

## Customization

### Update Skills Data

Edit [app/data/skills.ts](app/data/skills.ts:18-145):

```typescript
export const skillMountain: SkillLayer[] = [
  {
    name: 'Your Layer',
    elevation: 'X,000m - Your Description',
    description: 'Layer description',
    color: 'terracotta', // or sky-blue, weaving-pink, etc.
    skills: [
      {
        name: 'Your Skill',
        level: 4, // 1-5
        icon: '⚡',
        color: '#HEXCODE',
        description: 'What you know about this skill',
      },
      // Add more skills...
    ],
  },
  // Add more layers...
];
```

### Modify Categories

Edit [app/data/skills.ts](app/data/skills.ts:149-155):

```typescript
export const skillCategories = {
  yourCategory: ['Skill1', 'Skill2', 'Skill3'],
  // Add more categories...
};
```

Then update the category buttons in [SkillsSection.tsx](app/components/SkillsSection.tsx:16-21):

```typescript
const categories = [
  { id: null, label: 'All Skills', icon: '🗻' },
  { id: 'yourCategory', label: 'Your Label', icon: '🎯' },
  // Add more...
];
```

### Customize Mountain Colors

Edit gradients in [Mountain.tsx](app/components/Mountain.tsx:12-40):

```typescript
<linearGradient id="peakGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stopColor="YOUR COLOR" stopOpacity="0.9" />
  <stop offset="100%" stopColor="YOUR COLOR" stopOpacity="0.9" />
</linearGradient>
```

### Adjust Animation Speeds

**Layer Stagger Delay:**
```typescript
// In SkillsSection.tsx - SkillLayer component
transition={{ duration: 0.6, delay: index * 0.2 }} // Slower
transition={{ duration: 0.6, delay: index * 0.1 }} // Faster
```

**Skill Badge Stagger:**
```typescript
transition={{
  duration: 0.3,
  delay: index * 0.15 + skillIndex * 0.1, // Slower
}}
```

**Mountain Build Speed:**
```typescript
// In Mountain.tsx - each layer path
transition={{ duration: 1.2, delay: 0.2 }} // Slower
transition={{ duration: 0.5, delay: 0.2 }} // Faster
```

### Change Tooltip Position

Edit [SkillsSection.tsx](app/components/SkillsSection.tsx:154-157):

```typescript
// Current: bottom center
className="fixed bottom-8 left-1/2 -translate-x-1/2"

// Top center
className="fixed top-8 left-1/2 -translate-x-1/2"

// Bottom right
className="fixed bottom-8 right-8"
```

## File Structure

```
app/
├── components/
│   ├── SkillsSection.tsx      # Main skills section
│   ├── Mountain.tsx            # SVG mountain illustration
│   ├── HeroSection.tsx         # Hero (previous)
│   ├── AboutSection.tsx        # About (previous)
│   ├── TimelineItem.tsx        # Timeline (previous)
│   ├── Navigation.tsx          # Nav (foundation)
│   └── Footer.tsx              # Footer (foundation)
├── data/
│   ├── skills.ts               # Skills data & categories
│   └── timeline.ts             # Timeline data (previous)
└── page.tsx                    # Home page
```

## Testing

The Skills section should now be visible after the About section. Test these features:

### Visual
1. ✓ Section header with "Montaña del Stack" gradient
2. ✓ Category filter buttons (4 categories)
3. ✓ Animated mountain SVG on left
4. ✓ Mountain legend with colors
5. ✓ 5 skill layers on right
6. ✓ Skill badges with icons and levels
7. ✓ Stats footer (4 cards)

### Animations
1. ✓ Scroll to trigger mountain build animation
2. ✓ Watch layers fade in sequentially
3. ✓ Skill badges pop in with stagger
4. ✓ Flag waves continuously
5. ✓ Clouds drift across sky
6. ✓ Stats cards pop at bottom

### Interactions
1. ✓ Click "Frontend" filter → shows only frontend skills
2. ✓ Click "Backend" filter → shows only backend skills
3. ✓ Click "All Skills" → shows everything
4. ✓ Hover skill badge → tooltip appears at bottom
5. ✓ Move mouse away → tooltip disappears
6. ✓ Hover stats cards → lift effect

### Responsive
1. ✓ Resize to mobile → layout becomes single column
2. ✓ Mountain stays visible and scales
3. ✓ Filters remain accessible
4. ✓ Touch interactions work smoothly

## Next Steps

According to your PRD, you can now build:

**Option D: Projects Section** - Interactive project showcase with cards
**Option E: Llamita AI** - RAG-powered chat assistant

You've completed 3 out of 7 MVP sections:
1. ✅ Hero Section (Animated Llama)
2. ✅ About Section (Timeline)
3. ✅ Skills Section (Mountain)
4. ⏳ Projects Section
5. ⏳ Services Section
6. ⏳ Contact Section
7. ⏳ Llamita AI Chat

## Notes

### Mountain Metaphor
- Peak = Expert skills (daily use, deep mastery)
- Summit = Advanced skills (strong proficiency)
- Mid-Mountain = Proficient skills (solid working knowledge)
- Base = Competent skills (growing expertise)
- Foundation = Core skills (essential fundamentals)

### Skill Levels
- **Level 5**: Expert - Can teach others, handle edge cases
- **Level 4**: Advanced - Comfortable with most scenarios
- **Level 3**: Proficient - Working knowledge, some guidance needed
- **Level 2**: Competent - Basic understanding
- **Level 1**: Novice - Just learning

### Design Philosophy
The mountain visualization serves as:
- Visual metaphor for skill progression
- Thematic connection to Peru/Cusco
- Memorable alternative to boring skill lists
- Interactive exploration of expertise
- Storytelling through structure

### Tips for Content

**Adding New Skills:**
1. Decide which layer (based on proficiency)
2. Choose appropriate emoji icon
3. Set honest level (1-5)
4. Write clear, specific description
5. Use official brand colors when possible

**Organizing Layers:**
- Keep peak small (3-5 skills max)
- Distribute skills across layers
- Balance layer sizes
- Group related technologies
- Show progression over time

**Category Strategy:**
- Keep categories broad (3-5 total)
- Ensure skills appear in at least one category
- Frontend/Backend split is most common filter
- Consider adding "Learning" category for new skills
