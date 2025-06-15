# InMotion Dashboard Brand Colors

## Primary Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Pink Primary** | `#FF5595` | Main brand color used for primary actions, active navigation, logo background, and progress indicators |
| **Green Secondary** | `#41C1BA` | Used for success states, completion actions, and active status indicators |
| **Blue Accent** | `#4B8BFF` | Used for links, focus states, and charts/visualizations |

## Color Application Guidelines

### Pink Primary (`#FF5595`)
- **Primary buttons and CTAs** - Save buttons, Add New Goal
- **Active navigation items** - Selected tabs
- **Goal icons** - Consistent "target" icon for all goals
- **Progress bars** - Used at 60% opacity for softer appearance
- **Form input focus states**
- **Icon containers** - Used at 10% opacity as background

### Green Secondary (`#41C1BA`)
- **Completion indicators** - "Completed Goals" section icon
- **Success states** - Completed exercises
- **Secondary buttons** - Used at 10% opacity with text in full color

### Blue Accent (`#4B8BFF`)
- **Charts and visualizations** - Weight tracking bars at 70% opacity
- **Data visualization elements** - Graphs and charts
- **Secondary indicators** - Used for complementary information

## Supporting Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Text Primary** | `#1F2937` | Main text color |
| **Text Secondary** | `#6B7280` | Secondary/supporting text |
| **Background** | `#F8FAFC` | Page background |
| **Surface** | `#FFFFFF` | Card backgrounds |

## Opacity Guidelines

We use opacity variants to create visual hierarchy:

| Element | Opacity | Usage |
|---------|---------|-------|
| Primary buttons | 100% | Main calls to action |
| Progress bars | 60% | Softer visual for progress indicators |
| Chart bars | 70% | Visible but not overwhelming |
| Icon backgrounds | 10% | Subtle container backgrounds |
| Button hover states | 80-90% | Subtle feedback on interaction |

## Implementation Notes

- Status tags have been removed in favor of progress bars for cleaner UI
- Consistent icons are used across similar elements (target icon for goals, ruler for measurements)
- All measurement cards use the same styling with primary brand color
- Modal action buttons use the primary brand color
- Weight tracking uses a light gray background with accent color bars
- Add Custom button uses subtle styling with hover effect
- Text colors maintain proper contrast against backgrounds for accessibility

## CSS Variables

The colors are defined in the Tailwind configuration:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-primary': '#FF5595',
                'brand-secondary': '#41C1BA',
                'brand-accent': '#4B8BFF',
                'brand-lime': '#D4FF4F',
                'brand-bg': '#F8FAFC',
                'brand-surface': '#FFFFFF',
                'brand-text-primary': '#1F2937',
                'brand-text-secondary': '#6B7280',
            }
        }
    }
}
``` 