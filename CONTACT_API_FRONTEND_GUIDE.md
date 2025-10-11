# Contact Management API - Frontend Developer Guide

**Version:** 1.0.0  
**Last Updated:** October 11, 2025  
**Base URL:** `https://api.orgatick.in` (replace with your actual API URL)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [API Endpoints](#api-endpoints)
4. [Request/Response Examples](#request-response-examples)
5. [Error Handling](#error-handling)
6. [Frontend Implementation Examples](#frontend-implementation-examples)
7. [UI/UX Recommendations](#uiux-recommendations)

---

## Overview

The Contact Management API allows users to submit contact forms, track their submissions, provide feedback, and rate responses. All endpoints are publicly accessible with email verification for security.

### Key Features
- ✅ Contact form submission with file attachments
- ✅ Real-time status tracking
- ✅ Submission history by email
- ✅ Rating and feedback system
- ✅ Category-based routing
- ✅ Automatic acknowledgment emails

---

## Authentication

**All endpoints are public** but require email verification for status checking and updates.

**No API keys or authentication tokens required** for basic operations.

---

## API Endpoints

### 1. Submit Contact Form

Create a new contact submission.

**Endpoint:** `POST /contact`

**Content-Type:** `multipart/form-data` (for file uploads) or `application/json`

#### Request Parameters

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| `name` | string | ✅ Yes | 100 chars | User's full name |
| `email` | string | ✅ Yes | - | Valid email address |
| `message` | string | ✅ Yes | 5000 chars | Main message content |
| `phone` | string | ❌ No | - | Phone number (international format supported) |
| `subject` | string | ❌ No | 200 chars | Message subject/title |
| `category` | string | ❌ No | - | Category type (see list below) |
| `source` | string | ❌ No | - | Traffic source (default: "website") |
| `sourceDetails` | string | ❌ No | 200 chars | Additional source information |
| `attachments` | file[] | ❌ No | 5 files max | File attachments (10MB each, 25MB total) |

#### Valid Categories

| Value | Label | Response Time | Priority |
|-------|-------|---------------|----------|
| `general` | General Inquiry | 24-48 hours | Medium |
| `support` | Support Request | 12-24 hours | High |
| `sales` | Sales Inquiry | 4-8 hours | High |
| `project-inquiry` | Project Inquiry | 24 hours | High |
| `collaboration` | Collaboration | 48 hours | Medium |
| `feedback` | Feedback | 48 hours | Low |
| `complaint` | Complaint | 8-12 hours | Urgent |
| `bug-report` | Bug Report | 12-24 hours | High |
| `feature-request` | Feature Request | 48-72 hours | Low |
| `other` | Other | 24-48 hours | Medium |

#### File Attachments Specifications

- **Max files:** 5 per submission
- **Max file size:** 10MB per file
- **Max total size:** 25MB
- **Supported formats:** JPG, JPEG, PNG, GIF, PDF, DOC, DOCX, TXT

#### Success Response (201 Created)

```json
{
  "success": true,
  "message": "Your message has been received successfully. We will get back to you soon.",
  "data": {
    "id": "670895abc123def456789012",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Need Help with Integration",
    "status": "new",
    "attachmentCount": 2,
    "createdAt": "2025-10-11T10:30:00.000Z"
  }
}
```

#### Error Responses

**400 Bad Request - Missing Required Fields**
```json
{
  "success": false,
  "message": "Name, email, and message are required"
}
```

**400 Bad Request - Invalid Email**
```json
{
  "success": false,
  "message": "Please provide a valid email address"
}
```

**400 Bad Request - Too Many Files**
```json
{
  "success": false,
  "message": "Maximum 5 attachments allowed"
}
```

**400 Bad Request - File Size Exceeded**
```json
{
  "success": false,
  "message": "Total attachment size cannot exceed 25MB"
}
```

---

### 2. Get Contact Status

Check the status of a specific contact submission.

**Endpoint:** `GET /contact/status/:id`

**Query Parameters:**
- `email` (required) - Email address used in submission

#### Example Request

```
GET /contact/status/670895abc123def456789012?email=john@example.com
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "id": "670895abc123def456789012",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Need Help with Integration",
    "message": "I'm having trouble integrating your API...",
    "status": "in-progress",
    "priority": "High",
    "category": "support",
    "reply": "Thank you for reaching out. Our team is reviewing your request...",
    "feedback": null,
    "attachments": [
      {
        "originalName": "screenshot.png",
        "fileUrl": "https://res.cloudinary.com/orgatick/contact-attachments/screenshot.png",
        "fileSize": 2048576,
        "mimeType": "image/png"
      },
      {
        "originalName": "error-log.txt",
        "fileUrl": "https://res.cloudinary.com/orgatick/contact-attachments/error-log.txt",
        "fileSize": 4096,
        "mimeType": "text/plain"
      }
    ],
    "repliedAt": "2025-10-11T11:45:00.000Z",
    "resolvedAt": null,
    "createdAt": "2025-10-11T10:30:00.000Z",
    "updatedAt": "2025-10-11T11:45:00.000Z"
  }
}
```

#### Status Values

| Status | Description | Color Suggestion |
|--------|-------------|------------------|
| `new` | Just submitted | Blue |
| `open` | Being reviewed | Yellow |
| `in-progress` | Being worked on | Orange |
| `pending` | Waiting for user response | Purple |
| `resolved` | Issue resolved | Green |
| `closed` | Completed | Gray |

#### Error Responses

**400 Bad Request - Missing Parameters**
```json
{
  "success": false,
  "message": "Contact ID and email are required"
}
```

**404 Not Found**
```json
{
  "success": false,
  "message": "Contact not found or email does not match"
}
```

---

### 3. Get My Contacts (Submission History)

Retrieve all contact submissions for a specific email address.

**Endpoint:** `GET /contact/my-contacts`

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `email` | string | ✅ Yes | - | Email address |
| `page` | number | ❌ No | 1 | Page number |
| `limit` | number | ❌ No | 10 | Items per page (max 50) |

#### Example Request

```
GET /contact/my-contacts?email=john@example.com&page=1&limit=10
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": {
    "contacts": [
      {
        "_id": "670895abc123def456789012",
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Need Help with Integration",
        "message": "I'm having trouble integrating...",
        "status": "resolved",
        "priority": "High",
        "category": "support",
        "reply": "The issue has been resolved...",
        "repliedAt": "2025-10-11T11:45:00.000Z",
        "resolvedAt": "2025-10-11T12:30:00.000Z",
        "attachmentCount": 2,
        "createdAt": "2025-10-11T10:30:00.000Z",
        "updatedAt": "2025-10-11T12:30:00.000Z"
      },
      {
        "_id": "670795abc123def456789011",
        "name": "John Doe",
        "email": "john@example.com",
        "subject": "Feature Request",
        "message": "Would love to see...",
        "status": "open",
        "priority": "Low",
        "category": "feature-request",
        "reply": null,
        "repliedAt": null,
        "resolvedAt": null,
        "attachmentCount": 0,
        "createdAt": "2025-10-10T14:20:00.000Z",
        "updatedAt": "2025-10-10T14:20:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 3,
      "totalContacts": 25,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### 4. Rate Contact Response

Submit a rating for a resolved contact.

**Endpoint:** `PATCH /contact/:id/rate`

**Content-Type:** `application/json`

#### Request Body

| Field | Type | Required | Range | Description |
|-------|------|----------|-------|-------------|
| `email` | string | ✅ Yes | - | Email verification |
| `rating` | number | ❌ No | 1-5 | Star rating |
| `satisfactionScore` | number | ❌ No | 1-10 | Satisfaction score |

**Note:** At least one rating field must be provided.

#### Example Request

```json
POST /contact/670895abc123def456789012/rate
Content-Type: application/json

{
  "email": "john@example.com",
  "rating": 5,
  "satisfactionScore": 9
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Thank you for your feedback!",
  "data": {
    "id": "670895abc123def456789012",
    "rating": 5,
    "satisfactionScore": 9
  }
}
```

#### Error Responses

**400 Bad Request - Not Replied Yet**
```json
{
  "success": false,
  "message": "You can only rate contacts that have been replied to or resolved"
}
```

**400 Bad Request - Invalid Rating**
```json
{
  "success": false,
  "message": "Rating must be between 1 and 5"
}
```

---

### 5. Submit Additional Feedback

Add more information or feedback to an existing contact.

**Endpoint:** `PATCH /contact/:id/feedback`

**Content-Type:** `application/json`

#### Request Body

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| `email` | string | ✅ Yes | - | Email verification |
| `feedback` | string | ✅ Yes | 2000 chars | Additional feedback |

#### Example Request

```json
PATCH /contact/670895abc123def456789012/feedback
Content-Type: application/json

{
  "email": "john@example.com",
  "feedback": "The solution worked perfectly! Thank you for the quick response."
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Feedback submitted successfully",
  "data": {
    "id": "670895abc123def456789012",
    "feedback": "The solution worked perfectly! Thank you for the quick response."
  }
}
```

---

### 6. Get Contact Categories

Retrieve all available contact categories for dropdown menus.

**Endpoint:** `GET /contact/categories`

**No parameters required**

#### Success Response (200 OK)

```json
{
  "success": true,
  "data": [
    { "value": "general", "label": "General Inquiry" },
    { "value": "support", "label": "Support Request" },
    { "value": "sales", "label": "Sales Inquiry" },
    { "value": "project-inquiry", "label": "Project Inquiry" },
    { "value": "collaboration", "label": "Collaboration" },
    { "value": "feedback", "label": "Feedback" },
    { "value": "complaint", "label": "Complaint" },
    { "value": "bug-report", "label": "Bug Report" },
    { "value": "feature-request", "label": "Feature Request" },
    { "value": "other", "label": "Other" }
  ]
}
```

---

## Error Handling

All API errors follow this structure:

```json
{
  "success": false,
  "message": "Error message description"
}
```

### HTTP Status Codes

| Code | Meaning | When it occurs |
|------|---------|----------------|
| 200 | OK | Successful GET/PATCH request |
| 201 | Created | Successful POST (contact created) |
| 400 | Bad Request | Validation error, missing fields |
| 404 | Not Found | Contact not found or email mismatch |
| 500 | Server Error | Unexpected server error |

---

## Frontend Implementation Examples

### 1. React - Contact Form with File Upload

```jsx
import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate file count
    if (selectedFiles.length > 5) {
      setError('Maximum 5 files allowed');
      return;
    }

    // Validate total size
    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 25 * 1024 * 1024) {
      setError('Total file size cannot exceed 25MB');
      return;
    }

    setFiles(selectedFiles);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      
      // Append form fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      // Append files
      files.forEach(file => {
        data.append('attachments', file);
      });

      const response = await axios.post(
        'https://api.orgatick.in/contact',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
      });
      setFiles([]);

      // Show success message
      alert(`Success! Your reference ID is: ${response.data.data.id}`);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="tel"
        name="phone"
        placeholder="Your Phone (optional)"
        value={formData.phone}
        onChange={handleChange}
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="general">General Inquiry</option>
        <option value="support">Support Request</option>
        <option value="sales">Sales Inquiry</option>
        <option value="bug-report">Bug Report</option>
      </select>

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Your Message *"
        value={formData.message}
        onChange={handleChange}
        rows="5"
        required
      />

      <div className="file-upload">
        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
        />
        {files.length > 0 && (
          <div className="file-list">
            <p>{files.length} file(s) selected</p>
            <ul>
              {files.map((file, index) => (
                <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Message sent successfully!</div>}

      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
```

---

### 2. Vue.js - Track Contact Status

```vue
<template>
  <div class="contact-tracker">
    <h2>Track Your Submission</h2>
    
    <form @submit.prevent="trackStatus">
      <input
        v-model="contactId"
        type="text"
        placeholder="Your Contact ID"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Your Email"
        required
      />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Track Status' }}
      </button>
    </form>

    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="contact" class="contact-details">
      <div class="status-badge" :class="contact.status">
        {{ contact.status.toUpperCase() }}
      </div>
      
      <h3>{{ contact.subject || 'No Subject' }}</h3>
      
      <div class="info-row">
        <span>Category:</span>
        <strong>{{ contact.category }}</strong>
      </div>
      
      <div class="info-row">
        <span>Priority:</span>
        <strong>{{ contact.priority }}</strong>
      </div>
      
      <div class="info-row">
        <span>Submitted:</span>
        <strong>{{ formatDate(contact.createdAt) }}</strong>
      </div>

      <div class="message-box">
        <h4>Your Message:</h4>
        <p>{{ contact.message }}</p>
      </div>

      <div v-if="contact.reply" class="reply-box">
        <h4>Our Response:</h4>
        <p>{{ contact.reply }}</p>
        <small>Replied: {{ formatDate(contact.repliedAt) }}</small>
      </div>

      <div v-if="contact.attachments.length > 0" class="attachments">
        <h4>Attachments ({{ contact.attachments.length }}):</h4>
        <ul>
          <li v-for="(file, index) in contact.attachments" :key="index">
            <a :href="file.fileUrl" target="_blank">
              {{ file.originalName }} ({{ formatBytes(file.fileSize) }})
            </a>
          </li>
        </ul>
      </div>

      <div v-if="canRate" class="rating-section">
        <h4>Rate Our Response</h4>
        <button @click="showRatingModal = true">
          Give Feedback
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contactId: '',
      email: '',
      contact: null,
      loading: false,
      error: '',
      showRatingModal: false
    };
  },
  computed: {
    canRate() {
      return this.contact && 
             (this.contact.repliedAt || this.contact.resolvedAt);
    }
  },
  methods: {
    async trackStatus() {
      this.loading = true;
      this.error = '';
      this.contact = null;

      try {
        const response = await axios.get(
          `https://api.orgatick.in/contact/status/${this.contactId}`,
          {
            params: { email: this.email }
          }
        );
        
        this.contact = response.data.data;
      } catch (err) {
        this.error = err.response?.data?.message || 
                    'Failed to fetch contact details';
      } finally {
        this.loading = false;
      }
    },
    
    formatDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    
    formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }
  }
};
</script>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.status-badge.new { background: #e3f2fd; color: #1976d2; }
.status-badge.open { background: #fff3e0; color: #f57c00; }
.status-badge.in-progress { background: #fff9c4; color: #f57f17; }
.status-badge.resolved { background: #e8f5e9; color: #388e3c; }
</style>
```

---

### 3. JavaScript (Vanilla) - Fetch Categories

```javascript
// Fetch and populate category dropdown
async function loadCategories() {
  try {
    const response = await fetch('https://api.orgatick.in/contact/categories');
    const data = await response.json();
    
    if (data.success) {
      const select = document.getElementById('category-select');
      
      data.data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.value;
        option.textContent = category.label;
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Failed to load categories:', error);
  }
}

// Call when page loads
document.addEventListener('DOMContentLoaded', loadCategories);
```

---

### 4. Next.js - Submission History Page

```jsx
// pages/my-contacts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function MyContacts() {
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchContacts = async () => {
    if (!email) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        'https://api.orgatick.in/contact/my-contacts',
        {
          params: { email, page, limit: 10 }
        }
      );
      
      setContacts(response.data.data.contacts);
      setPagination(response.data.data.pagination);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchContacts();
  };

  useEffect(() => {
    if (email) fetchContacts();
  }, [page]);

  return (
    <div className="container">
      <h1>My Contact Submissions</h1>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">View Submissions</button>
      </form>

      {loading && <p>Loading...</p>}

      {contacts.length > 0 && (
        <>
          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact._id} className="contact-card">
                <div className="contact-header">
                  <h3>{contact.subject || 'No Subject'}</h3>
                  <span className={`status ${contact.status}`}>
                    {contact.status}
                  </span>
                </div>
                
                <p className="message-preview">
                  {contact.message.substring(0, 150)}...
                </p>
                
                <div className="contact-meta">
                  <span>Category: {contact.category}</span>
                  <span>Priority: {contact.priority}</span>
                  {contact.attachmentCount > 0 && (
                    <span>📎 {contact.attachmentCount} attachment(s)</span>
                  )}
                </div>
                
                <div className="contact-footer">
                  <small>
                    Submitted: {new Date(contact.createdAt).toLocaleDateString()}
                  </small>
                  {contact.repliedAt && (
                    <span className="replied">✓ Replied</span>
                  )}
                </div>
                
                <a href={`/contact/${contact._id}`} className="view-details">
                  View Details →
                </a>
              </div>
            ))}
          </div>

          {pagination && pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={!pagination.hasPrevPage}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              
              <span>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              
              <button
                disabled={!pagination.hasNextPage}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
```

---

## UI/UX Recommendations

### 1. Contact Form Design

**Essential Form Fields:**
```
┌─────────────────────────────────────────┐
│  📧 Contact Us                          │
├─────────────────────────────────────────┤
│  Name: [_________________________] *    │
│  Email: [________________________] *    │
│  Phone: [________________________]      │
│  Category: [▼ Support Request    ]      │
│  Subject: [_______________________]     │
│  Message: [________________________]  * │
│           [________________________]    │
│           [________________________]    │
│  📎 Attachments: [Choose Files]         │
│     (Max 5 files, 25MB total)          │
│                                         │
│  [ Submit Message ]                     │
└─────────────────────────────────────────┘
```

**UI Elements:**
- Use `*` to indicate required fields
- Show character count for message field (5000 max)
- Display file preview with remove option
- Show upload progress bar for large files
- Disable submit button while sending
- Show success confirmation with reference ID

---

### 2. Status Tracking Interface

**Status Badge Colors:**
```css
.status-new { 
  background: #e3f2fd; 
  color: #1976d2; 
}
.status-open { 
  background: #fff3e0; 
  color: #f57c00; 
}
.status-in-progress { 
  background: #fff9c4; 
  color: #f57f17; 
}
.status-resolved { 
  background: #e8f5e9; 
  color: #388e3c; 
}
.status-closed { 
  background: #f5f5f5; 
  color: #616161; 
}
```

**Timeline View:**
```
Created       Replied      Resolved
   ●━━━━━━━━━━━●━━━━━━━━━━━●
   Oct 11      Oct 11       Oct 11
   10:30 AM    11:45 AM     12:30 PM
```

---

### 3. Rating Component

**Star Rating UI:**
```
How would you rate our response?

★ ★ ★ ★ ★  (1-5 stars)

Satisfaction Score:
1  2  3  4  5  6  7  8  9  10
●  ○  ○  ○  ○  ○  ○  ○  ○  ○

[Submit Rating]
```

---

### 4. Responsive Design

**Mobile Breakpoints:**
```css
/* Mobile: < 768px */
- Stack form fields vertically
- Full-width inputs
- Larger touch targets (min 44px)
- Collapsible sections

/* Tablet: 768px - 1024px */
- 2-column layout for form
- Side-by-side inputs for name/email

/* Desktop: > 1024px */
- Multi-column layout
- Sticky sidebar for status info
- Inline file previews
```

---

### 5. Loading States

**Skeleton Loaders:**
```jsx
<div className="skeleton">
  <div className="skeleton-line" style={{ width: '60%' }}></div>
  <div className="skeleton-line" style={{ width: '80%' }}></div>
  <div className="skeleton-line" style={{ width: '40%' }}></div>
</div>
```

**Progress Indicators:**
- Spinner for form submission
- Progress bar for file uploads
- Shimmer effect for loading lists
- "Loading..." text with animation

---

### 6. Validation Messages

**Real-time Validation:**
```javascript
// Email validation
if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
  showError('Please enter a valid email address');
}

// Phone validation (optional)
if (phone && !phone.match(/^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/)) {
  showError('Please enter a valid phone number');
}

// Message length
if (message.length > 5000) {
  showError('Message cannot exceed 5000 characters');
}
```

---

### 7. Success Confirmation

**After Form Submission:**
```jsx
<div className="success-modal">
  <div className="success-icon">✓</div>
  <h2>Message Sent Successfully!</h2>
  <p>We've received your message and will respond soon.</p>
  
  <div className="reference-box">
    <strong>Your Reference ID:</strong>
    <code>670895abc123def456789012</code>
    <button onClick={copyToClipboard}>📋 Copy</button>
  </div>
  
  <p className="info-text">
    An acknowledgment email has been sent to {email}.
    Expected response time: <strong>12-24 hours</strong>
  </p>
  
  <div className="action-buttons">
    <button onClick={trackStatus}>Track Status</button>
    <button onClick={sendAnother}>Send Another Message</button>
  </div>
</div>
```

---

### 8. Error Handling UI

**User-Friendly Error Messages:**

| Error | Display Message |
|-------|----------------|
| Network error | "Unable to connect. Please check your internet connection." |
| Timeout | "Request timed out. Please try again." |
| 400 error | Show specific validation message from API |
| 404 error | "Contact not found. Please check your reference ID and email." |
| 500 error | "Something went wrong on our end. Please try again later." |

---

## Testing Checklist

### Form Submission Tests
- [ ] Submit with all required fields
- [ ] Submit with optional fields empty
- [ ] Submit with invalid email format
- [ ] Submit with invalid phone format
- [ ] Submit without required fields
- [ ] Submit with 1 attachment
- [ ] Submit with 5 attachments (max)
- [ ] Submit with 6 attachments (should fail)
- [ ] Submit with file > 10MB (should fail)
- [ ] Submit with total size > 25MB (should fail)
- [ ] Submit with unsupported file type
- [ ] Test all category options

### Status Tracking Tests
- [ ] Track with valid ID and email
- [ ] Track with invalid ID
- [ ] Track with wrong email
- [ ] Track with missing parameters
- [ ] View attachments
- [ ] Check reply when available

### Rating Tests
- [ ] Rate with valid rating (1-5)
- [ ] Rate with invalid rating (0, 6)
- [ ] Rate before reply (should fail)
- [ ] Rate with satisfaction score
- [ ] Submit feedback

### Pagination Tests
- [ ] Navigate to next page
- [ ] Navigate to previous page
- [ ] Jump to specific page
- [ ] Check hasNextPage/hasPrevPage
- [ ] View 10, 25, 50 items per page

---

## FAQ for Developers

**Q: Do I need an API key?**  
A: No, all endpoints are public. Email verification provides security.

**Q: What's the rate limit?**  
A: Contact your backend team for current rate limiting policies.

**Q: Can I upload videos?**  
A: No, only images (JPG, PNG, GIF) and documents (PDF, DOC, TXT) are supported.

**Q: How long are files stored?**  
A: Files are stored indefinitely on Cloudinary unless deleted by admin.

**Q: Can users edit their submissions?**  
A: No, but they can add feedback using the feedback endpoint.

**Q: Is real-time update available?**  
A: No, users must manually refresh or re-query the status endpoint.

**Q: What if email is wrong in submission?**  
A: User won't be able to track status. Email must match exactly.

**Q: Can I get notifications?**  
A: Yes, automatic acknowledgment email is sent on submission.

---

## Support

For technical support or questions:
- **Email:** developers@orgatick.in
- **Documentation:** https://docs.orgatick.in
- **API Status:** https://status.orgatick.in

---

**Happy Coding! 🚀**

*This documentation is maintained by the Orgatick Backend Team*
