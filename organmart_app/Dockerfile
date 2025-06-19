FROM node:18

WORKDIR /app

# Copy file cài đặt trước
COPY package.json package-lock.json ./

# Cài đúng môi trường (Linux)
RUN npm install

# Sau đó mới copy toàn bộ source
COPY . .

EXPOSE 19000 19001 19002
CMD ["npm", "start"]
