import type { Checklist } from "./checklist.types";

export const itOffboarding: Checklist = {
  slug: "it-offboarding-checklist",
  title: "IT Offboarding Checklist",
  path: "/blog/it-offboarding-checklist",
  pdfFile: "/downloads/it-offboarding-checklist-94135ebe.pdf",
  intro:
    "The accounts you forget are the ones that cause problems. A former employee's login to a tool outside single sign-on, a personal API key still running in production, or a shared password nobody rotated is a standing risk that grows with every exit handled informally. This checklist walks IT and HR through the full revocation sequence: identity provider, productivity suites, chat, code and cloud, shared credentials, licenses, devices and mail. It ends with an audit step so you can show what was done and when. Work from the top down on or before the last day, record who completed each step, and adapt the order to your own stack and security policy. Treat it as general guidance and extend it for any system your team runs that is not listed here.",
  sections: [
    {
      heading: "Preparation before the last day",
      items: [
        { text: "Get the confirmed last day and exit type (planned or immediate) from HR." },
        { text: "Agree the exact time access will be removed on the last day." },
        { text: "Pull a list of every account the person holds from your identity provider, app directories and manager input." },
        { text: "List devices and hardware assigned to the person, including phones and security keys." },
        { text: "Identify systems where the person is the sole admin or owner." },
        { text: "Name who will take over each owned system, mailbox and shared resource." },
      ],
    },
    {
      heading: "Identity provider, SSO and MFA",
      items: [
        { text: "Suspend the user in your identity provider at the agreed time." },
        { text: "Revoke active sessions and refresh tokens." },
        { text: "Remove registered MFA devices, authenticator apps and security keys." },
        { text: "Remove the user from groups, roles and conditional-access exceptions." },
        { text: "Check for service accounts or app passwords created by the user." },
        { text: "Disable or delete the account only after data handover is complete.", note: "Suspend first, delete later." },
      ],
    },
    {
      heading: "Google Workspace and Microsoft 365",
      items: [
        { text: "Sign the user out of all devices and sessions in the admin console." },
        { text: "Reset the password and block sign-in." },
        { text: "Review third-party app grants and remove unneeded OAuth authorizations." },
        { text: "Remove the user from distribution lists, shared mailboxes and calendars." },
        { text: "Export or retain mailbox and drive data according to your retention policy." },
        { text: "Convert the mailbox to shared or archive it if the successor needs access." },
      ],
    },
    {
      heading: "Slack and Teams",
      items: [
        { text: "Deactivate the account in Slack or Teams at the agreed time." },
        { text: "Transfer ownership of channels, workspaces and teams the user managed." },
        { text: "Reassign bots, webhooks and apps installed under the user's account." },
        { text: "Remove the user from guest access in partner workspaces." },
      ],
    },
    {
      heading: "Code repositories and CI",
      items: [
        { text: "Remove the user from the organization or team on your code host." },
        { text: "Revoke personal access tokens and SSH keys tied to the account." },
        { text: "Transfer ownership of repositories, forks and projects they own." },
        { text: "Review CI/CD secrets and pipelines the user created or could view." },
        { text: "Check for deploy keys and webhooks set up under the user." },
      ],
    },
    {
      heading: "Cloud consoles and API keys",
      items: [
        { text: "Remove the user from cloud consoles, projects and roles." },
        { text: "Revoke or rotate API keys and tokens the user created." },
        { text: "Review service accounts and access keys the user could read." },
        { text: "Check infrastructure-as-code, DNS and domain registrar access." },
        { text: "Review monitoring, logging and alerting tools for admin rights." },
      ],
    },
    {
      heading: "Password manager and shared credentials",
      items: [
        { text: "Remove the user from the password manager and revoke their vault access." },
        { text: "List the shared credentials they could see and rotate every one." },
        { text: "Rotate shared logins for tools that sit outside single sign-on." },
        { text: "Update recovery emails and phone numbers that point at the leaver." },
        { text: "Change any codes, PINs or Wi-Fi keys known to the user." },
      ],
    },
    {
      heading: "SaaS licenses",
      items: [
        { text: "Review the user's SaaS accounts and remove their seats." },
        { text: "Reassign or reclaim licenses so you stop paying for unused seats." },
        { text: "Transfer ownership of shared dashboards, reports and automations." },
        { text: "Check billing and admin contacts so no vendor sends renewals to the leaver." },
      ],
    },
    {
      heading: "Device return and remote wipe",
      items: [
        { text: "Confirm which devices were issued and which personal devices hold company data." },
        { text: "Arrange the return of laptops, phones and accessories." },
        { text: "Lock or remotely wipe devices that are not returned on time." },
        { text: "Remove company profiles, apps and certificates from personal devices." },
        { text: "Log each returned device in the asset register with its condition." },
      ],
    },
    {
      heading: "Email forwarding and auto-reply",
      items: [
        { text: "Set an auto-reply that names the new contact." },
        { text: "Forward incoming mail to the successor or manager for an agreed period." },
        { text: "Schedule a date to remove the forwarding and close the mailbox." },
      ],
    },
    {
      heading: "Calendar and shared-drive ownership",
      items: [
        { text: "Transfer ownership of shared drives, folders and documents." },
        { text: "Reassign recurring meetings and calendar events the user organizes." },
        { text: "Check shared documents with external partners for orphaned permissions." },
        { text: "Remove the user from external calendar invitations where appropriate." },
      ],
    },
    {
      heading: "Audit log and sign-off",
      items: [
        { text: "Review sign-in and admin logs for unusual activity in the final weeks." },
        { text: "Confirm each system above shows the account as removed or suspended." },
        { text: "Record who completed each step and when." },
        { text: "Run a second check after 30 days for any access that reappeared." },
      ],
    },
  ],
  faq: [
    {
      q: "What is an IT offboarding checklist?",
      a: "An IT offboarding checklist is the list of access removal and device recovery tasks completed when an employee leaves. It covers identity accounts, email, collaboration tools, code and cloud access, shared credentials, licenses and hardware, plus a final audit so you can show that nothing was left active.",
    },
    {
      q: "When should access be revoked?",
      a: "Agree the exact time in advance and remove access then, usually at the end of the last working day, or immediately for an involuntary exit. Prepare everything beforehand so removal is a quick sequence of steps rather than a search for forgotten accounts on the day.",
    },
    {
      q: "Why rotate shared credentials when someone leaves?",
      a: "Anyone who could see a shared password or key still knows it after they leave. Changing the credential means the leaver's copy stops working, even if they never intended to misuse it. Rotation is simple to do when you keep a list of what each person could access.",
    },
    {
      q: "What about apps that are not behind single sign-on?",
      a: "Apps outside single sign-on keep working after the main account is suspended, so they need a manual step. Keep an up-to-date app inventory, ask the manager which tools the person used, and review each tool's user list. Moving more apps behind single sign-on shrinks this problem over time.",
    },
    {
      q: "Should the leaver's account be deleted straight away?",
      a: "Usually not. Suspend the account first so nobody can sign in, then delete it after email, files and ownership have been transferred and any retention period has passed. Deleting too early can destroy documents the successor needs and remove records you may want for an audit.",
    },
  ],
};
