
# Blueprint: Product Prioritization Tool

## Overview

This document outlines the plan and progress for creating a Product Prioritization Tool. The tool will help users rank feature ideas based on the RICE framework and will include an AI-powered feature to generate a mini-PRD for the winning idea.

## Initial Plan

1.  **Set up the project:** Install necessary dependencies (`lucide-react`, `tailwindcss`).
2.  **Create the main page:** Design the main page with a dark theme, a title, and a grid for the feature cards.
3.  **Build the `FeatureCard` component:** This component will display the feature name, sliders for Reach, Impact, Confidence, and Effort, and the calculated RICE score.
4.  **Implement the RICE logic:** Create a function to calculate the RICE score based on the slider values.
5.  **Highlight the top feature:** Dynamically identify the feature with the highest score and apply a distinct style to it.
6.  **Create the PRD modal:** Build a modal that displays a mock PRD for the selected feature.
7.  **Add the "Generate Mini-PRD" button:** Add a button to the winning feature's card to open the PRD modal.
