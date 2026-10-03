// Shared validation for the website API and the generated Apps Script copy.
export default function validateXperts(data, mentorNames) {
  const fail = message => { throw new Error(message); };
  if (!data || typeof data !== 'object' || Array.isArray(data)) fail('Invalid application.');
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(data.id || '') || data.website) fail('Invalid application.');
  const text = (key, max, required = true) => {
    if (typeof data[key] !== 'string' || data[key].length > max) fail('Please check your application details.');
    const value = data[key].trim();
    if (required && !value) fail('Please complete all required fields.');
    return value;
  };
  const result = { id: data.id, name: text('name', 200), email: text('email', 254),
    school: text('school', 200), year: text('year', 100), major: text('major', 200), hasProject: data.hasProject };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) fail('Please enter a valid email address.');
  if (!['yes', 'no'].includes(data.hasProject)) fail('Please tell us whether you have a project.');
  result.projectTitle = data.hasProject === 'yes' ? text('projectTitle', 200) : '';
  result.projectDescription = data.hasProject === 'yes' ? text('projectDescription', 4000) : '';
  result.motivation = data.hasProject === 'no' ? text('motivation', 4000) : '';
  if (!Array.isArray(data.choices) || data.choices.length < 1 || data.choices.length > 3) fail('Choose between one and three mentors.');
  const seen = new Set();
  result.choices = data.choices.map(choice => {
    if (!choice || typeof choice.id !== 'string' || !Object.prototype.hasOwnProperty.call(mentorNames, choice.id)) fail('Please choose a mentor from our directory.');
    if (seen.has(choice.id)) fail('Please select a different mentor for each choice.');
    seen.add(choice.id);
    if (typeof choice.reason !== 'string' || !choice.reason.trim() || choice.reason.length > 2000) fail('Please explain each mentor choice (up to 2,000 characters).');
    return { id: choice.id, name: mentorNames[choice.id], reason: choice.reason.trim() };
  });
  return result;
}
