# InMotion Dashboard Brand Colors

## Primary Color Palette

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Pink Primary** | `#FF5595` | Main brand color used for primary actions, active navigation, logo background, and progress indicators |
| **Green Secondary** | `#4CAF50` | Used for success states, completion actions, and active status indicators |
| **Blue Accent** | `#4B8BFF` | Used for links, focus states, and completed status indicators |

## Color Application Guidelines

### Pink Primary (`#FF5595`)
- **Primary buttons and CTAs**
- **Active navigation items**
- **Logo background**
- **Progress bars**
- **Notes save buttons**
- **Form input focus states**

### Green Secondary (`#4CAF50`)
- **Completion buttons** (exercise completion)
- **Active status indicators**
- **Success states**

### Blue Accent (`#4B8BFF`)
- **Links**
- **Focus outlines**
- **Completed status indicators**
- **Note indicators**

## Supporting Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| **Text Primary** | `#1F2937` | Main text color |
| **Text Secondary** | `#6B7280` | Secondary/supporting text |
| **Background** | `#F8FAFC` | Page background |
| **Surface** | `#FFFFFF` | Card backgrounds |

## Implementation Notes

- The color system is implemented using Tailwind CSS custom colors
- Legacy lime color (`#D4FF4F`) has been maintained for backward compatibility
- Form inputs use the primary pink color for focus states
- All interactive elements have appropriate hover and focus states
- Text colors maintain proper contrast against backgrounds for accessibility

## CSS Variables

The colors are defined in the Tailwind configuration:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'brand-primary': '#FF5595',
                'brand-secondary': '#4CAF50',
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