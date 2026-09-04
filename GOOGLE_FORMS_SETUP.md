# Google Forms Setup Guide

## Option 1: Simple Interest Form (Recommended)

### Create a Google Form for "I'm Interested"

1. Go to [Google Forms](https://forms.google.com)
2. Click "Create" → "Blank form"
3. Name it: "Used Cars Interest Form"
4. Add these fields:
   - **Name** (Short answer)
   - **Email** (Short answer)
   - **Phone Number** (Short answer)
   - **Vehicle Description** (Short answer) - e.g., "2020 Honda Civic"
   - **Budget** (Short answer)
   - **Additional Notes** (Paragraph)

5. Click "Responses" tab
6. Click the Google Sheets icon to create linked sheet
7. Save the form URL

### Link Form Responses to Database

When someone submits the form:
- Responses go to Google Sheets automatically
- Bot syncs forms every 30 minutes
- Creates an inquiry in our database
- **You get notified on your Google Voice number**

### Embed Form on Website

In your frontend, add an iframe:

```html
<iframe 
  src="https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true" 
  width="640" 
  height="866" 
  frameborder="0" 
  marginheight="0" 
  marginwidth="0"
>Loading…</iframe>
```

---

## Option 2: Quick Add Form (For You)

Use this form to quickly add vehicles:

1. Create new Google Form: "Quick Vehicle Add"
2. Fields:
   - VIN
   - Year (Number)
   - Make
   - Model
   - Type (Dropdown: Car/Truck)
   - Price (Number)
   - Mileage (Number)
   - Condition (Dropdown: Excellent/Good/Fair/Poor)
   - Description
   - Seller Name
   - Seller Phone
   - Seller Email

3. Link to Google Sheets
4. The bot reads this sheet and adds vehicles automatically

---

## Option 3: Combine Both

**Sheet 1: Vehicles** (Auto-syncs inventory)
**Sheet 2: Interest Responses** (Auto-syncs inquiries)
**Sheet 3: Payments** (Track who paid)

---

## Best Practices

✅ Use Google Forms for data collection
✅ Link to Google Sheets for storage
✅ Bot syncs sheets to Firebase
✅ Everything flows automatically
✅ Zero manual data entry

---

**You add vehicles via Google Form → Sheet auto-syncs → Bot displays them → Buyers express interest via Form → You get notified**
