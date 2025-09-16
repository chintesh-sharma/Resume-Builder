// --------- Templates ---------
const templates = {
  chintesh: {
    title: "Chintesh Resume Template",
    html: `
      <style>
        .resume { font-family: {{subheadingFont}}; color:#222; max-width:900px; margin:0 auto; }
        .resume .header { margin-bottom:8px; }
        .resume h1.name { margin:0; color:{{color}}; font-family: {{headingFont}}; font-size:34px; }
        .resume .contact { color:#334; margin-top:6px; font-size:14px; font-family: {{subheadingFont}}; }
        .resume hr.sep { border:0; height:3px; background:{{color}}; margin:12px 0 18px 0; width:100%; }
        .resume h3.section { color:{{color}}; font-size:18px; margin:12px 0 8px;}
        .resume p, .resume ul { margin:6px 0; font-size:14px; line-height:1.5; }
        .resume table { width:100%; border-collapse:collapse; margin-top:8px; font-size:14px;}
        .resume table th, .resume table td { padding:8px 6px; border:1px solid #e3e7e7; text-align:left; }
        .resume table th { background:#f1f8f8; font-weight:700; color:#0f4b49; }
        .resume ul { margin:8px 0 8px 18px; }
      </style>

      <div class="resume">
        <div class="header">
          <h1 class="name">{{name}}</h1>
          <div class="contact">{{address}} | {{phone}}</div>
          <div class="contact"><a href="mailto:{{email}}" style="color:{{color}};text-decoration:none">{{email}}</a> | <a href="{{linkedin}}" style="color:{{color}};text-decoration:none">{{linkedin}}</a></div>
        </div>

        <hr class="sep">

        <h3 class="section">Career Objective</h3>
        <p>{{objective}}</p>

        <h3 class="section">Education</h3>
        <table>
          <tr>
            <th>Course</th><th>Year</th><th>Institute / Board</th><th>Percentage / Status</th>
          </tr>
          {{education}}
        </table>

        <div id="project-section">
          <h3 class="section">Project</h3>
          <p><strong>Project:</strong> {{projectTitle}} &nbsp;&nbsp; <strong>Role:</strong> {{projectRole}} &nbsp;&nbsp; <strong>Team Size:</strong> {{teamSize}}</p>
          <p><strong>Duration:</strong> {{duration}} &nbsp;&nbsp; <strong>Technologies:</strong> {{technologies}}</p>
          <p><strong>Description:</strong> {{projectDescription}}</p>
        </div>

        <h3 class="section">Skills</h3>
        <p><strong>Soft Skills:</strong> {{softSkills}}</p>
        <p><strong>Hard Skills:</strong> {{hardSkills}}</p>

        <h3 class="section">Activities</h3>
        <ul>{{activities}}</ul>

        <h3 class="section">Personal Details</h3>
        <p><strong>DOB:</strong> {{dob}} &nbsp;&nbsp; <strong>Languages:</strong> {{languages}}</p>
        <p><strong>Permanent Address:</strong> {{fullAddress}}</p>
      </div>
    `
  }
};

// --------- State ---------
let currentTemplate = null;
let hideProject = false;
let headingFont = "'Georgia', serif";
let subheadingFont = "'Georgia', serif";
let color = "#10636d";

// --------- DOM Elements ---------
const useTemplateBtn = document.getElementById('use-template-btn');
const previewBtn = document.getElementById('preview-btn');
const downloadBtn = document.getElementById('download-btn');
const backBtn = document.getElementById('back-btn');

useTemplateBtn.onclick = () => selectTemplate('chintesh');
previewBtn.onclick = () => generatePreview();
downloadBtn.onclick = () => downloadPDF();
backBtn.onclick = () => goBack();
document.getElementById('no-project').onchange = toggleProject;

function updateFontPreview(){
  headingFont = document.getElementById('heading-font').value;
  subheadingFont = document.getElementById('subheading-font').value;
  color = document.getElementById('color-select').value;
  const preview = document.getElementById('font-preview');
  preview.innerHTML = `
    <div style="font-family:${headingFont}; font-size:28px; color:${color}">John Doe</div>
    <div style="font-family:${subheadingFont}; font-size:16px; color:${color}">Web Developer | Contact Info</div>
  `;
}

function selectTemplate(key){
  currentTemplate = templates[key];
  document.getElementById('template-selection').style.display = 'none';
  document.getElementById('editor').style.display = 'block';
  buildForm();
}

function buildForm(){
  const c = document.getElementById('form-area');
  c.innerHTML = `
    <div class="group"><label>Name</label><input type="text" id="name" placeholder="Yuvraj Rajput"></div>
    <div class="group"><label>Address</label><input type="text" id="address" placeholder="95 Vasant Vihar "></div>
    <div class="row">
      <div class="group"><label>Phone</label><input type="text" id="phone" placeholder="1234567890"></div>
      <div class="group"><label>Email</label><input type="text" id="email" placeholder="youremail@gmail.com"></div>
    </div>
    <div class="group"><label>LinkedIn / Website</label><input type="text" id="linkedin" placeholder="https://www.linkedin.com/in/yourusername/"></div>
    <div class="group"><label>Career Objective</label><textarea id="objective" rows="3" placeholder="Write your career objective(5 Line)"></textarea></div>

    <div class="group">
      <label>Education</label>
      <div id="edu-rows"></div>
      <button class="small-btn" type="button" onclick="addEduRow()">+ Add Row</button>
    </div>

    <div id="project-block" class="group">
      <label>Project Title</label><input type="text" id="projectTitle" placeholder="Enter project title">
      <div class="row">
        <div class="group"><label>Role</label><input type="text" id="projectRole" placeholder="Role"></div>
        <div class="group"><label>Team Size</label><input type="text" id="teamSize" placeholder="Team size"></div>
      </div>
      <div class="row">
        <div class="group"><label>Duration</label><input type="text" id="duration" placeholder="Duration"></div>
        <div class="group"><label>Technologies</label><input type="text" id="technologies" placeholder="Technologies"></div>
      </div>
      <div class="group"><label>Description</label><textarea id="projectDescription" rows="3" placeholder="Project description"></textarea></div>
    </div>

    <div class="group"><label>Soft Skills</label><input type="text" id="softSkills" placeholder="e.g. Leadership, Communication"></div>
    <div class="group"><label>Hard Skills</label><input type="text" id="hardSkills" placeholder="e.g. HTML, CSS, JS"></div>
    <div class="group"><label>Activities</label><textarea id="activities" rows="3" placeholder="One activity per line"></textarea></div>
    <div class="row">
      <div class="group"><label>DOB</label><input type="text" id="dob" placeholder="DD/MM/YYYY"></div>
      <div class="group"><label>Languages</label><input type="text" id="languages" placeholder="Languages known"></div>
    </div>
    <div class="group"><label>Permanent Address</label><textarea id="fullAddress" rows="2" placeholder="Full permanent address"></textarea></div>
  `;
  addEduRow(); // initial row
}

function addEduRow(){
  const container = document.getElementById('edu-rows');
  const div = document.createElement('div');
  div.className = 'edu-row';
  div.innerHTML = `
    <input placeholder="Course">
    <input placeholder="Year" style="width:100px">
    <input placeholder="Institute">
    <input placeholder="Percentage" style="width:100px">
    <button class="small-btn" onclick="this.parentElement.remove()">Remove</button>
  `;
  container.appendChild(div);
}

function buildEduHtml(){
  const rows = document.querySelectorAll('#edu-rows .edu-row');
  let html='';
  rows.forEach(r=>{
    const inputs = r.querySelectorAll('input');
    html += `<tr><td>${inputs[0].value}</td><td>${inputs[1].value}</td><td>${inputs[2].value}</td><td>${inputs[3].value}</td></tr>`;
  });
  return html;
}

function buildActivitiesHtml(val){
  return val.split(/\n/).map(s=>`<li>${s}</li>`).join('');
}

function toggleProject(){
  const c = document.getElementById('no-project').checked;
  document.getElementById('project-block').style.display = c?'none':'block';
}

function generatePreview(){
  if(!currentTemplate) return;
  let out = currentTemplate.html;
  const values={
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    linkedin: document.getElementById('linkedin').value,
    objective: document.getElementById('objective').value,
    education: buildEduHtml(),
    projectTitle: document.getElementById('projectTitle').value,
    projectRole: document.getElementById('projectRole').value,
    teamSize: document.getElementById('teamSize').value,
    duration: document.getElementById('duration').value,
    technologies: document.getElementById('technologies').value,
    projectDescription: document.getElementById('projectDescription').value,
    softSkills: document.getElementById('softSkills').value,
    hardSkills: document.getElementById('hardSkills').value,
    activities: buildActivitiesHtml(document.getElementById('activities').value),
    dob: document.getElementById('dob').value,
    languages: document.getElementById('languages').value,
    fullAddress: document.getElementById('fullAddress').value,
    headingFont: headingFont,
    subheadingFont: subheadingFont,
    color: color
  };
  Object.keys(values).forEach(k=>{
    out = out.replace(new RegExp('{{'+k+'}}','g'), values[k]);
  });
  if(document.getElementById('no-project').checked){
    out = out.replace(/<div id="project-section">[\s\S]*?<\/div>/,'');
  }
  document.getElementById('preview').innerHTML = out;
}

function downloadPDF(){
  const preview = document.getElementById('preview');
  if(!preview.innerHTML.trim()){ alert('Generate preview first'); return;}
  html2pdf().set({
    margin:0.4,
    filename:document.getElementById('name').value+'.pdf',
    image:{type:'jpeg', quality:0.98},
    html2canvas:{scale:2},
    jsPDF:{unit:'in', format:'a4', orientation:'portrait'}
  }).from(preview).save();
}

function goBack(){
  document.getElementById('editor').style.display='none';
  document.getElementById('template-selection').style.display='block';
  document.getElementById('preview').innerHTML='';
  document.getElementById('no-project').checked=false;
}
