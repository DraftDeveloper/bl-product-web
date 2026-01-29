Web application พัฒนาด้วย Next.js (App Router) + Tailwind CSS
Next.js 14+ (App Router) React + TypeScript
วิธีรัน project ในเครื่องครับถ้าต้องการรัน
1. Node.js
แนะนำเวอร์ชัน:
Node.js >= 18
2. Package Manager
npm 
3. Access Token 
โปรเจกต์นี้ จะใส่่ token ใน .env ครับ เพื่อความปลอดภัยครับ
ต้องมีไฟล์ env ถึงจะ run project ได้
สร้างไฟล์ .env.local
ใส่ค่า:

# Betterland API
BL_BASE_URL=xxxxxxx
BL_API_TOKEN=your-real-token-here
# Merchant
BL_MCHID=99999

Install Dependencies
npm install
จากนั้นเปิดเบราว์เซอร์:
http://localhost:3000
