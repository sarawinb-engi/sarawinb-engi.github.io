# Sarawin Buakaew — Portfolio

Static portfolio for Manufacturing Engineering, industrial automation, and software development. The main page highlights the current role at EPSON PRECISION (THAILAND), starting June 2026, and the completed Transfer Data and PLC Communication DLL projects.

## Edit content

- `index.html`: introduction, projects, experience, skills, about, and contact.
- `css/portfolio.css`: dark monochrome design, responsive editorial layouts, reduced-motion and print styles.
- `js/portfolio.js`: mobile navigation, one-time scroll reveals, subtle desktop portrait movement, reading progress, active navigation, and footer year. Motion respects `prefers-reduced-motion`; no animation library is required.
- `images/profile.jpg`: existing portrait, reused without modification.
- `resume-sarawinb.pdf`: existing CV; its contents have not been updated in this redesign. Replace it with an updated PDF when ready. Both CV buttons use this file.

### เติมรายละเอียดผลงาน

ค้นหา `PROJECT DETAILS` ใน `index.html` ใต้การ์ดแต่ละผลงาน แล้วเพิ่มข้อมูลที่พร้อมเผยแพร่ เช่น:

```html
<details class="project-details">
  <summary>Project details</summary>
  <dl>
    <dt>Problem & goal</dt><dd>ใส่ปัญหาและเป้าหมาย</dd>
    <dt>My contribution</dt><dd>ใส่ส่วนที่คุณรับผิดชอบ</dd>
    <dt>Technology</dt><dd>ใส่เทคโนโลยีที่ใช้จริง</dd>
    <dt>Results</dt><dd>ใส่ผลลัพธ์ที่ยืนยันได้</dd>
  </dl>
</details>
```

เพิ่มภาพได้ด้วย `<img src="images/your-project.jpg" alt="คำอธิบายภาพ" loading="lazy">` ไม่ต้องใส่หัวข้อที่ยังไม่มีข้อมูล รูปในสองการ์ดปัจจุบันเป็นแผนผังแนวคิด ไม่ใช่ภาพหน้าจอโปรแกรมจริง ไม่ได้ระบุ protocol, รุ่น PLC หรือผลลัพธ์เชิงตัวเลขที่ยังไม่ได้ยืนยัน

วันที่ของประสบการณ์ก่อนหน้าเว้นไว้ จนกว่าจะมีข้อมูลที่ถูกต้อง อีเมลหลักใช้ `sarawin.bua@gmail.com` ตามข้อความติดต่อในเว็บเดิม และเบอร์โทรใช้ `+66 61 503 6105` ตามที่แสดงเดิม

## Local preview

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765. No dependency installation or build is required. The root `index.html` remains compatible with the existing GitHub Pages repository layout.

## 21st.dev design references

The redesigned main page uses an original HTML/CSS implementation adapting the split hero and grid-background interaction/layout direction from these 21st.dev references. React component source was not installed or copied; the existing buildless architecture is preserved.

- [Hero with image, text and two buttons — Tommy Jepsen](https://21st.dev/@tommyjepsen/components/hero-with-image-text-and-two-buttons)
- [Grid Pattern — Dillion Verma / Magic UI](https://21st.dev/@dillionverma/components/grid-pattern)
- [Card layouts](https://21st.dev/community/components/s/card)

## Legacy files

`styles.html`, `css/styles.css`, `css/vendor.css`, `js/script.js`, and `js/plugins.js` belong to the previous Hudson / StyleShout template. They are retained for reference; the redesigned main page does not load them. Their existing attribution remains in the legacy template. `resume.html` is also an older standalone page; current CV links use the PDF above.

## Validation

Check desktop and mobile layouts, menu open/close and Escape, the earlier ROS project disclosure, local anchors and assets, and CV links. Email and telephone links should be inspected without sending messages or placing calls.

## Dark design revision

The current direction uses restrained dark surfaces, system typography, a monochrome portrait (CSS only), and alternating project rows. The original 21st.dev references inform the composition; this is an original static adaptation, not an Apple template or a React component installation. Project concept diagrams animate once on arrival, not as live machine-status indicators.

### Enterprise motion refinement

Slate-blue surfaces and formal section headings retain the personal dark direction. Each conceptual project diagram has a keyboard-accessible Replay flow button, plus a finite animation on pointer entry. Pointer highlights run only on fine-pointer devices; replay controls and motion are disabled for reduced-motion preferences. The diagrams do not represent live machine telemetry.

### Technology logo strip

The technology strip uses five locally stored SVG logos; WinForms is paired with the .NET mark. See `images/tech/SOURCES.md` for provenance. Two identical groups loop smoothly with CSS transforms. Pause/Resume works on keyboard and touch; hovering pauses the strip. Offscreen/background tabs pause to save work. Reduced motion and no-JavaScript mode show a single wrapping list.
