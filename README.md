# MERN-Stack techNotes Application 
## techNotes

techNotes is a comprehensive note-taking application designed to streamline communication and task management within your organization. It replaces traditional sticky note systems with a digital solution that offers enhanced features and accessibility. Below are the key functionalities and user stories of techNotes:

1. **Replace current sticky note system**
   - techNotes replaces physical sticky notes with a digital platform for efficient note-taking and management.

2. **Add a public facing page with basic contact info**
   - A public-facing page displays basic contact information for easy accessibility.

3. **Add an employee login to the notes app**
   - Employees can securely log in to access the note-taking application.

4. **Provide a welcome page after login**
   - Upon logging in, users are greeted with a welcoming page.

5. **Provide easy navigation**
   - Intuitive navigation ensures smooth user experience throughout the application.

6. **Display current user and assigned role**
   - Users can easily identify their role within the organization upon logging in.

7. **Provide a logout option**
   - A logout option allows users to securely end their session.

8. **Require users to login at least once per week**
   - To ensure security and active engagement, users are prompted to log in at least once per week.

9. **Provide a way to remove employee access asap if needed**
   - Administrators have the capability to promptly revoke employee access if necessary.

10. **Notes are assigned to specific employees**
    - Notes are assigned to specific employees for clear task delegation and accountability.

11. **Notes have a ticket #, title, note body, created & updated dates**
    - Each note includes essential details such as a ticket number, title, note body, creation date, and last update date.

12. **Notes are either OPEN or COMPLETED**
    - Notes are categorized as either open tasks or completed tasks for effective task management.

13. **Users can be Employees, Managers, or Admins**
    - Users are categorized into three roles: Employees, Managers, or Administrators, each with distinct privileges and responsibilities.

14. **Notes can only be deleted by Managers or Admins**
    - Managers and Administrators have exclusive permission to delete notes for data integrity and security.

15. **Anyone can create a note (when customer checks-in)**
    - Notes can be created by any authorized user, facilitating seamless communication when customers check in.

16. **Employees can only view and edit their assigned notes**
    - Employees have access to view and edit only the notes assigned to them, ensuring privacy and focus on relevant tasks.

17. **Managers and Admins can view, edit, and delete all notes**
    - Managers and Administrators have comprehensive access to view, edit, and delete all notes for efficient oversight and management.

18. **Only Managers and Admins can access User Settings**
    - User settings are accessible only to Managers and Administrators for configuring user permissions and preferences.

19. **Only Managers and Admins can create new users**
    - Managers and Administrators have the authority to create new user accounts within the system.

20. **Desktop mode is most important but should be available in mobile**
    - While prioritizing desktop functionality, techNotes is designed to be responsive, ensuring accessibility and usability across various devices, including mobile.

With techNotes, your organization can streamline communication, enhance task management, and foster collaboration effectively.
## Visual Overview of the app:
### Homepage:

### Login:

### Employee Dashboard:

### Notes to improve code in future:
- look back on the roles array
- Instead of an asyncHandler use following pkg:
npm i express-async-errors (require('express-async-errors') in server.js)