# AYASKRITI Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from premium industrial/enterprise platforms like Linear (for clean data interfaces), Stripe (for trust and clarity), and modern SaaS dashboards, combined with distinctive Indian industrial aesthetics and heavy use of glassmorphism effects.

## Core Design Principles
1. **Industrial Elegance**: Premium UI that reflects the sophistication of metallurgy with metallic treatments and glass effects
2. **Motion Storytelling**: Smooth, purposeful animations that guide users through complex workflows
3. **Data Clarity**: Clear hierarchy for technical information and sustainability metrics
4. **Indian Industrial Identity**: Visual language rooted in Indian manufacturing heritage

## Typography
- **Primary Font**: Inter or Outfit (modern, technical feel) via Google Fonts
- **Accent Font**: Rajdhani or Teko (Indian-inspired, industrial)
- **Hierarchy**:
  - Hero/Headlines: 4xl-6xl, bold (700-800)
  - Section Titles: 2xl-3xl, semibold (600)
  - Body Text: base-lg, regular (400)
  - Captions/Meta: sm-xs, medium (500)

## Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Container max-widths: max-w-7xl for main content, max-w-6xl for forms
- Section padding: py-16 to py-24 on desktop, py-8 to py-12 on mobile
- Card padding: p-6 to p-8
- Form fields: space-y-4 to space-y-6

## Color System (Applied Later)
Guidelines specify: Steel grey, Copper orange, Aluminium silver, Indian earthy tones with dark metallic theme for dashboards. Glassmorphic overlays with backdrop blur effects throughout.

## Component Library

### Authentication Page
- **Layout**: Split-screen (50/50 on desktop)
- **Left Panel**: Full-height video background showing Indian metal industry (smelting, foundries, rolling mills) with dark overlay (opacity-40)
- **Right Panel**: Centered glassmorphic card (max-w-md) with backdrop blur, soft shadow, and subtle border
- **Form Elements**: Floating labels, animated input borders, smooth focus states
- **Buttons**: Full-width primary CTA with metallic gradient background and blur effect

### Data Input Forms
- **Structure**: Multi-step wizard with progress indicator at top
- **Step Cards**: Glassmorphic containers with clear section headers
- **Input Fields**: 
  - Material selector: Radio cards with icons (factory symbols for each metal type)
  - Numeric inputs: With unit labels, min/max validation indicators
  - Grouped fields: Grid layout (grid-cols-2 gap-4) for related parameters
- **Validation**: Real-time with smooth error message animations below fields

### Processing/Loading States
- **Full-Screen Overlays**: Glassmorphic modal with backdrop blur
- **Animated Icons**: Rotating gears, processing bars with metallic shimmer
- **Status Text**: Clear step indicators ("Analyzing data...", "Estimating parameters...")
- **Progress Visualization**: Linear progress bar with gradient fill

### Dashboard/Visualization
- **Layout**: Grid-based (grid-cols-1 lg:grid-cols-2 xl:grid-cols-3)
- **Metric Cards**: Glassmorphic cards with large numbers, trend indicators, and sparklines
- **Charts**: Full-width chart containers with dark backgrounds, metallic grid lines
  - Bar charts for material comparisons
  - Radar charts for multi-dimensional sustainability scores
  - Line graphs for trend analysis
- **Chart Styling**: Metallic gradients for fills, smooth animations on load

### Decision Points (Modify Inputs)
- **Modal Dialog**: Centered glassmorphic card over darkened backdrop
- **Action Buttons**: Side-by-side layout, clear visual distinction between "Modify" and "Continue"
- **Context Display**: Summary of current values above decision prompt

### Recommendations & Report
- **Section Layout**: Single column (max-w-4xl) with generous spacing
- **Insight Cards**: Stacked cards with icons, priority badges, and expandable details
- **Material-Specific Suggestions**: Color-coded by metal type with relevant industry icons
- **Export Section**: Prominent download button with file format preview

### Navigation
- **Top Nav**: Glassmorphic header with logo left, user menu right, sticky on scroll
- **Breadcrumbs**: Below header showing workflow progress
- **Step Indicators**: Horizontal stepper for multi-stage workflows

## Animations
**Use Sparingly**: Focus on meaningful transitions
- **Page Transitions**: Smooth fade and slide (200-300ms)
- **Card Hover**: Subtle lift (translateY -2px) with shadow increase
- **Form Focus**: Border color transition and input scale (100ms)
- **Loading States**: Pulsing/shimmer effects for data fetching
- **Chart Entrance**: Staggered animation on mount (500ms)
- **Modal Appearance**: Scale up from 95% to 100% with fade

## Images
- **Hero Video**: Full-screen looping background on auth page (Indian metallurgy operations - foundries, molten metal, industrial workers, modern facilities)
- **Section Backgrounds**: Subtle texture overlays (metal grain, industrial patterns) at low opacity
- **Icons**: Industrial themed - factory buildings, metal ingots, gears, sustainability symbols, Indian manufacturing imagery
- **Chart Backgrounds**: None - keep data visualization clean

## Accessibility
- Maintain WCAG AA contrast ratios despite glass effects
- Ensure all form inputs have visible labels and clear focus states
- Keyboard navigation throughout entire workflow
- Loading state announcements for screen readers
- Consistent button sizing (minimum 44x44px touch targets)

## Responsive Behavior
**Desktop-First Approach**:
- Desktop (1280px+): Full multi-column layouts, side-by-side forms
- Tablet (768-1279px): 2-column grids collapse to 1, maintain glass effects
- Mobile (<768px): Single column, simplified navigation, larger touch targets, reduced animation complexity

## Key Differentiators
- Heavy use of glassmorphism (backdrop-blur, subtle borders, semi-transparent backgrounds)
- Metallic gradient accents throughout
- Industrial iconography with Indian manufacturing context
- Smooth workflow transitions reflecting the step-by-step LCA process
- Dark theme for data-heavy sections with high contrast for readability