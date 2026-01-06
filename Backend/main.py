from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
import resend
from models import Base, ContactForm

# ---------------- LOAD ENV ----------------
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

# ---------------- DATABASE ----------------
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base.metadata.create_all(bind=engine)

# ---------------- RESEND SETUP ----------------
resend.api_key = os.getenv("RESEND_API_KEY")

# ---------------- FASTAPI APP ----------------
app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- CONTACT FORM ----------------
@app.post("/api/contact")
def submit_contact(data: dict):
    db = SessionLocal()
    try:
        contact = ContactForm(
            name=data.get("name"),
            email=data.get("email"),
            phone=data.get("phone"),
            project_type=data.get("projectType"),
            message=data.get("message"),
        )
        db.add(contact)
        db.commit()
    finally:
        db.close()

    resend.Emails.send({
        "from": "Qkest <onboarding@resend.dev>",
        "to": ADMIN_EMAIL,
        "subject": "New Qkest Contact Form",
        "html": f"""
        <h3>New User Submission</h3>
        <p><b>Name:</b> {data.get('name')}</p>
        <p><b>Email:</b> {data.get('email')}</p>
        <p><b>Phone:</b> {data.get('phone')}</p>
        <p><b>Project:</b> {data.get('projectType')}</p>
        <p><b>Message:</b><br>{data.get('message')}</p>
        """
    })

    return {"status": "success"}

# ---------------- HARDCODED CHATBOT ----------------
def get_bot_response(message: str) -> str:
    message = message.lower().strip()
    
    if any(word in message for word in ["hi", "hello", "hey", "start", "menu"]):
        return """👋 Welcome to Qkest - Your AI Development Partner!

I'm here to help you. Please choose an option:

1️⃣ About the Company
2️⃣ Book an Appointment
3️⃣ View Our Projects
4️⃣ Our Services

Just type the number or name of what you'd like to know!"""

    elif any(word in message for word in ["1", "about", "company", "who are you"]):
        return """🚀 About Qkest

Qkest is an AI-powered development company specializing in building cutting-edge digital solutions. We transform your ideas into reality using advanced AI technology.

✨ What We Do:
- AI-Powered Web Development
- Mobile App Development
- Game Development
- AI Automation & Integration

💡 Our Mission:
We automate the technical complexity while you focus on innovation. With AI at our core, we deliver 10x faster than traditional development.

🎯 Why Choose Us:
- Lightning-fast delivery
- Enterprise-grade security
- Superior code quality
- AI-driven optimization

Type 'menu' to see all options or ask me anything else!"""

    elif any(word in message for word in ["2", "appointment", "book", "schedule", "meeting"]):
        return """📅 Book an Appointment

Great! I'd love to schedule a meeting with you.

To book an appointment:
1. Scroll down to our Contact section
2. Fill out the contact form with your details
3. Select 'Appointment' as your project type
4. Our team will reach out within 24 hours

Or you can directly email us at:
📧 hello@qkest.com
📞 +1 (555) 123-4567

We're excited to discuss your project!

Type 'menu' for more options."""

    elif any(word in message for word in ["3", "project", "portfolio", "work", "examples"]):
        return """💼 Our Projects

Check out some of our recent AI-powered projects:

🏋️ Gym Website
- Responsive gym management system
- Membership tracking & class schedules
- Built with React & Firebase

🍕 Food Delivery Website
- E-commerce platform with payment integration
- Menu browsing & order placement
- Developed using Next.js & Stripe

🌱 Seeds Management Project
- Agricultural seed inventory system
- Supplier database & analytics
- Created with Vue.js & MongoDB

📊 Scroll down to the 'Projects' section to see live demos!

Type 'menu' for more options."""

    elif any(word in message for word in ["4", "service", "what do you offer", "what can you do"]):
        return """🛠️ Our Services

We offer comprehensive AI-powered development solutions:

💻 Web Development
- Custom websites with React, Next.js, Vue
- E-commerce platforms
- Progressive Web Apps (PWA)
- Fast, secure, and scalable

📱 Mobile App Development
- Native iOS & Android apps
- Cross-platform with React Native & Flutter
- Cloud integration
- User-friendly interfaces

🎮 Game Development
- 2D & 3D games with Unity/Unreal Engine
- Mobile, PC & console games
- AI-powered game mechanics
- Engaging storytelling

🤖 AI Automation
- Custom AI integrations
- Chatbots & virtual assistants
- Process automation
- Machine learning solutions

Click 'Get Started' button or type 'appointment' to discuss your project!"""

    elif any(word in message for word in ["price", "cost", "how much", "pricing", "budget"]):
        return """💰 Pricing Information

Our pricing is flexible and depends on your project requirements:

📊 Factors we consider:
- Project complexity
- Timeline requirements
- Features & functionality
- Maintenance & support needs

💡 We offer:
- Free initial consultation
- Transparent pricing
- Flexible payment plans
- Money-back guarantee

📅 Book a free consultation to get a custom quote!
Type 'appointment' to schedule or 'menu' for more options."""

    elif any(word in message for word in ["contact", "email", "phone", "reach"]):
        return """📞 Contact Us

We'd love to hear from you!

📧 Email: hello@qkest.com
📱 Phone: +1 (555) 123-4567
📍 Location: Your City, Country

🌐 Connect with us:
- GitHub: github.com/qkest
- LinkedIn: linkedin.com/company/qkest
- Twitter: @qkest

Or fill out our contact form below and we'll get back to you within 24 hours!

Type 'menu' to return to main options."""

    elif any(word in message for word in ["tech", "technology", "stack", "tools"]):
        return """⚙️ Technology Stack

We use cutting-edge technologies:

🎨 Frontend:
- React, Next.js, Vue.js
- Tailwind CSS, Material UI
- TypeScript, JavaScript

⚡ Backend:
- Node.js, Python, FastAPI
- PostgreSQL, MongoDB
- Redis, Docker

🤖 AI & ML:
- OpenAI, Hugging Face
- TensorFlow, PyTorch
- Custom AI models

☁️ Cloud & DevOps:
- AWS, Google Cloud, Azure
- CI/CD pipelines
- Kubernetes, Terraform

Type 'menu' for more options!"""

    elif any(word in message for word in ["thank", "thanks", "appreciate"]):
        return """😊 You're welcome!

We're here to help anytime. Feel free to ask me anything about:
- Our company
- Our services
- Booking appointments
- Our projects

Type 'menu' to see all options or ask me anything!"""

    elif any(word in message for word in ["bye", "goodbye", "see you", "exit"]):
        return """👋 Thanks for chatting with Qkest!

We look forward to working with you. Feel free to:
- Explore our website
- Fill out the contact form
- Come back anytime with questions

Have a great day! 🚀"""

    else:
        return f"""🤔 I'm not sure I understand "{message}"

Here's what I can help you with:

1️⃣ About the Company
2️⃣ Book an Appointment  
3️⃣ View Our Projects
4️⃣ Our Services

You can also ask about:
- Pricing & costs
- Contact information
- Technology we use
- Anything else!

Type 'menu' to see all options or just ask your question!"""


@app.post("/api/chat")
def chat(data: dict):
    user_message = data.get("message", "")
    
    if not user_message:
        return {"response": "Please type a message!"}
    
    bot_response = get_bot_response(user_message)
    
    return {"response": bot_response}


@app.get("/")
def root():
    return {"status": "Qkest backend running - 100% hardcoded!"}