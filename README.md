# Coursebox

Find your next favorite course on Coursebox

## ⚒ Stack

NestJS + mySQL


## 📐 ERD Diagram

![](https://github.com/ngankhanh98/coursebox-server/blob/main/docs/erd.v0.png?raw=true)

- Teachers:
**A teacher** might have **n courses**.

- Courses:
**A course** is belong to **1 teacher**, have **n chapters**, classified to **n tags**
- Members:
**A member** can join **0..n courses**
