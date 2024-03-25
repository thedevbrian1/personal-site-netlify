
export function XIcon({ toggleMenu }) {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleMenu}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}

export function MenuIcon({ toggleMenu }) {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="#ffffff"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onClick={toggleMenu}
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    );
}

export function ArrowLeftIcon() {
    return (
        <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
    )
}

export function Facebook() {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            // fill="currentColor"
            className="fill-white hover:fill-[#4267B2] transition duration-200 ease-in-out w-6 h-6"
            xmlns="http://www.w3.org/2000/svg">
            <title>Facebook: Brian Mwangi</title>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
        </svg>
    );
}

export function Twitter() {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            className="fill-white hover:fill-[#1DA1F2] transition duration-200 ease-in-out w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
        // whileHover={{
        //     fill: '#000000',
        //     transition: {
        //         duration: 1,
        //     }
        // }}
        >
            <title>Twitter: @_3R14N_</title>
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
    );
}

export function LinkedIn() {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white hover:fill-[#0A66C2] transition duration-200 ease-in-out w-6 h-6"
        >
            <title>LinkedIn</title>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    )
}

export function ClipboardIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
        </svg>
    );
}

export function ClipboardCheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75" />
        </svg>
    );
}

export function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
    );
}

export function ErrorIcon() {
    return (
        <svg id="Layer_1" data-name="Layer 1" fill='#fff' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45.26 65.4"><path class="cls-1" d="M4602.87-1990.71c0-.31-.06-.56-.1-.83s-.08-.56-.11-.93-.06-.54-.1-.81-.11-.52-.16-.7l-.07-.53-.07-.24c0-.08-.05-.17-.07-.26l-.12-.52-.13-.52c-.09-.33-.19-.64-.28-.9-.25-.79-.48-1.57-.77-2.34l-.19-.52-.21-.51-.43-1c-.1-.22-.25-.54-.3-.63-.16-.26-.3-.56-.46-.88l-.49-1a42.45,42.45,0,0,0-2.31-3.81l-.31-.46-.33-.45-.66-.91c-.46-.59-.9-1.19-1.39-1.76l-.46-.55a3.47,3.47,0,0,0-.42-.43l-.35-.46-.37-.36-.62-.67.21-.36c.28-.47.43-.9.71-1.36a1.47,1.47,0,0,0,.07-.17,9.53,9.53,0,0,1,.55-1.12,4.51,4.51,0,0,0,.33-.66c.06-.17.28-.47.35-.67a5.85,5.85,0,0,1,.41-.78c.06-.13.18-.32.21-.39a5.59,5.59,0,0,1,.5-1,7.15,7.15,0,0,0,.54-1.17,2.35,2.35,0,0,1,.33-.63,4.93,4.93,0,0,0,.34-.54c0-.11.07-.21.1-.32a5.6,5.6,0,0,0-.41.55l.09-.26c.09-.22.22-.39.28-.58l-.14-.08s-.06,0,0-.06c.12-.34,0-.2-.1-.23s-.16.17-.26.3-.08.18-.12.27a1,1,0,0,0-.07.15s-.07.06-.07,0,0-.28.07-.43a3.32,3.32,0,0,0-.23.37,1.66,1.66,0,0,1-.23.37c-.05,0-.06,0-.2.22a1.66,1.66,0,0,1-.23.37c.07-.22.14-.44.25-.75l-.39.68c-.11.21-.23.41-.34.61a5.29,5.29,0,0,1-.36.6c0-.07.15-.38.08-.4a7.69,7.69,0,0,0-.36.94l-.16.29a.88.88,0,0,1-.06.1l-.08.09s0-.07,0-.14.23-.36.22-.46l-.06.08c-.34.61-.69,1.22-1,1.83a10,10,0,0,1-.68,1.07,7,7,0,0,0-.66,1l-.12.15a5.15,5.15,0,0,0-.44.61,4.12,4.12,0,0,0-.22.36l0,0c-.13-.14-.28-.3-.43-.44a4.28,4.28,0,0,0-.42-.37c-.15-.12-.35-.31-.55-.49a4.78,4.78,0,0,0-.53-.43c-.17-.12-.47-.38-.82-.68a29.47,29.47,0,0,0-4.47-3.3l-.29-.13-.26-.12c-.16-.07-.25-.1-.2,0s-.06,0-.22,0l-.52-.22-.47-.22-.22-.09-.21-.08-.42-.16-.44-.15a11.34,11.34,0,0,0-2.57-.6l.5.15s0,0,0,0l-.41,0-.39,0-.5-.07c-.16,0-.21,0-.2,0l.19,0c.3.07.37.1.09.08s-.4,0-.4,0,.16.09-.13.09l-.36,0-.37,0a4.32,4.32,0,0,0-.72,0c-.19,0-.5,0-.78,0a3.7,3.7,0,0,0-.59.09l-.4.11-.31.06-.35.09s-.11.06-.28.12l-.56.2c-.23.1-.28.14,0,.07a1.81,1.81,0,0,1,.37,0l.33,0c.07,0,.11,0,.1,0a.78.78,0,0,1-.18.07l-.46.17-.54.18a3.58,3.58,0,0,0-.46.19c-.13.1-.16.15-.05.15a1.68,1.68,0,0,0,.26-.06l.47-.13c.16,0,.16,0,.18,0h.08l.26-.06.28-.07.24,0,.34,0c.17,0,.24,0,.21.05s.15,0,.42,0l.24,0h.15a.71.71,0,0,0,.29.05,5,5,0,0,0,.57,0l.41,0,.19,0,.19,0,.39,0,.49,0a4,4,0,0,1,.65.14,4.1,4.1,0,0,0,.53.19l.36.12.19.07.18.07a13,13,0,0,1,2.16.79c.36.16.72.34,1,.51a10.28,10.28,0,0,0,.94.55l.4.23a4.5,4.5,0,0,0,.44.25,3.21,3.21,0,0,1,.35.24,31.34,31.34,0,0,1,3.32,2.7c.72.75,1.6,1.57,2.4,2.39-.11.19-.21.34-.33.52s-.26.46-.4.68-.29.43-.45.71a7.68,7.68,0,0,1-.73,1.23c-.15.27-.32.55-.45.81s-.35.5-.51.81l-.46.82-.4.71-.45.81c-.16.31-.3.42-.45.72s-.31.54-.46.81l-.45.81a6.74,6.74,0,0,1-.51.86c-.24.29-.21.46-.37.71a3.18,3.18,0,0,1-.17.27,2.08,2.08,0,0,0-.22.33l-.63,1.12,0,.07-.1-.15c-.19-.28-.4-.55-.58-.83s-.34-.42-.51-.66l-.47-.66c-.15-.22-.32-.44-.46-.66s-.32-.38-.46-.58-.45-.6-.64-.9-.39-.44-.59-.74-.43-.6-.65-.9c-.08-.11-.18-.27-.23-.32a5.35,5.35,0,0,1-.7-.91c-.37-.49-.71-1-1.08-1.47-.12-.17-.26-.28-.41-.49s-.31-.44-.47-.65l-.42-.58-.48-.65a3,3,0,0,0-.18-.24c-.37-.38-.68-.87-1-1.3a15.17,15.17,0,0,0-1.08-1.37l-.49-.66a1.73,1.73,0,0,0-.35-.39c-.13-.2-.23-.23-.35-.4a5,5,0,0,0-.36-.4c-.16-.18-.32-.42-.49-.63a2.94,2.94,0,0,1-.53-.65c-.28-.38-.58-.65-.86-1a1.13,1.13,0,0,0-.11-.11c-.13-.13-.26-.26-.39-.41l.15-.06c.39-.16.78-.31,1.22-.45a4.82,4.82,0,0,1,1.46-.25c.44,0,.88,0,1.33,0h.34l.35,0a1.31,1.31,0,0,0-.27-.07,2.63,2.63,0,0,0-.34-.06l-.38,0h-.41l.18,0h.4a9.32,9.32,0,0,1,1.37.17.53.53,0,0,1,.05-.15s0,0,.11,0c.76.15.38,0,.41-.09a1.23,1.23,0,0,0-.28-.11l-.27-.09-.14,0-.13,0-.3,0-.37,0-.37,0c-.05,0-.19,0-.14,0s.31,0,.47,0h.51a3.13,3.13,0,0,0-.49-.08l-.26,0-.26,0h-1c-.09,0,0-.09-.67,0l-.52.08-.25,0-.23,0a10.33,10.33,0,0,1,1.82-.39,9.62,9.62,0,0,0-1.84.25,10.18,10.18,0,0,0-1.57.47,3.85,3.85,0,0,0-.47.19,4.33,4.33,0,0,0-.38-.47,4.65,4.65,0,0,1-.49-.59c-.08-.1-.19-.26-.24-.31a4.41,4.41,0,0,1-.62-.72,5.62,5.62,0,0,0-.78-.83,1.91,1.91,0,0,1-.39-.48,4.6,4.6,0,0,0-.32-.45l-.23-.2a2.74,2.74,0,0,0,.28.52l-.19-.16a5.48,5.48,0,0,0-.37-.43l-.14.09s0,0-.07,0c-.24-.2-.2,0-.26,0s.08.18.15.3a2.17,2.17,0,0,0,.17.19l.1.1s0,.08,0,.07l-.35-.2a1.43,1.43,0,0,0,.22.3,2,2,0,0,1,.22.31s-.07,0,.09.24a1.21,1.21,0,0,1,.22.3l-.55-.45c.17.23.3.38.42.53l.37.48a4.41,4.41,0,0,1,.36.49c-.07,0-.26-.25-.32-.2a6.56,6.56,0,0,0,.66.61l.18.22.06.08s.05.1,0,.1a.17.17,0,0,1-.12-.06c-.09-.09-.2-.31-.3-.34a.28.28,0,0,0,0,.08c.37.48.73,1,1.11,1.44l0,0c-.27.19-.51.37-.79.59l-.6.44-.2.17c-.1.06-.23.16-.23.14a.65.65,0,0,1,.19-.22l.23-.19.27-.2a2.77,2.77,0,0,0,.43-.34l-.21.13a12.88,12.88,0,0,0-1.82,1.54c-.27.29-.54.58-.78.89l-.18.24-.17.24-.32.48-.1.16-.1.17-.19.31c-.13.2-.23.41-.34.6l-.16.29-.14.29-.14.29-.07.14-.07.15-.25.58-.23.6-.06.16,0,.16-.1.32-.09.34-.08.36a2.93,2.93,0,0,1-.12.38,5.37,5.37,0,0,0-.18.69c-.06.29-.12.61-.17.85a11.31,11.31,0,0,0-.14,1.15c0,.15,0,.35,0,.52s0,.33,0,.41a9.69,9.69,0,0,0-.08,1v1.65l0,.6c0,.27,0,.5,0,.77l0,.66c0,.21,0,.42,0,.64s0,.48.06.77.05.6.09.86c.07.58.1,1,.19,1.74.09.48.2,1,.29,1.5l.07.37,0,.18,0,.18a6,6,0,0,1,.11.68l.22,1c0,.16.08.31.12.47s.09.3.13.45a10,10,0,0,1,.26,1l.05.22.06.22c0,.16.09.31.15.49.21.61.39,1.24.63,1.85l.29.8c.1.27.2.54.31.8l.38.91.19.46c.07.15.13.29.2.43.32.66.4,1,.71,1.63l.91,1.74.24.43.25.43.49.86.14.23.15.24.3.47c.2.31.39.61.52.86a1.83,1.83,0,0,0,.13.24,1.27,1.27,0,0,0,.13.19q.12.18.24.33a6.05,6.05,0,0,1,.48.63c.12.18.3.43.38.56s.27.41.49.71l.42.54.21.28,0,0-.08.13-.16.29a4.45,4.45,0,0,1-.44.87c-.68,1.22-1.36,2.44-2.05,3.66a2.54,2.54,0,0,0-.27.56l-.16.22-.08.22c-.22.4-.45.8-.67,1.21a2.88,2.88,0,0,0-.26.48c0,.17-.23.46-.25.61a1.92,1.92,0,0,1-.2.44l-1.24,2.2c-.05.17-.15.39-.06.36s0,.21-.08.34-.24.5-.37.75a8.46,8.46,0,0,0-.46,1l.16-.18s0,0,0,0,0,.12,0,.18a2.65,2.65,0,0,1-.17.36c-.06.12,0,.1,0,0s.13-.13.09,0-.05.17,0,.19.11,0,.07.08-.23.4-.29.59a4,4,0,0,0-.23.57,1.12,1.12,0,0,1-.16.48c.06,0,0,.24-.09.41s0,.14.06,0,.1-.07.15-.11c.23-.19.24-.21.11.19-.08.17-.2.33-.24.46s.1.15.34-.18c.1-.13.07,0,.21-.19s.33-.47.38-.4.07,0,.14-.17a.82.82,0,0,1,.11-.17c.06,0,.19-.12.31-.32a8,8,0,0,0,.46-.71,1.26,1.26,0,0,1,.2-.27,2.82,2.82,0,0,0,.48-.52l.57-1c.1-.17.21-.35.29-.51s.21-.22.27-.47a3.63,3.63,0,0,0,.19-.44,2,2,0,0,1,.1-.18l1-1.83a15.24,15.24,0,0,0,1-1.63l.45-.81a12.27,12.27,0,0,0,.85-1.43c.29-.5.57-1,.86-1.52a2.6,2.6,0,0,1,.26-.38l.41-.74c.11-.2.22-.4.34-.6a5.2,5.2,0,0,0,.47.47,4.63,4.63,0,0,1,.43.48,6,6,0,0,0,.6.63l.37.32a3.14,3.14,0,0,1,.31.32l1.22,1a20.8,20.8,0,0,0,2.83,2,17.62,17.62,0,0,0,3,1.4,14.24,14.24,0,0,0,3.62.77,15.7,15.7,0,0,0,1.82,0,9.1,9.1,0,0,0,1.67-.23,9.45,9.45,0,0,0,2-.41,17.7,17.7,0,0,0,3.67-1.59,18.93,18.93,0,0,0,3.18-2.24,12.19,12.19,0,0,0,1.53-1.51c.14-.14.28-.31.42-.47l.39-.42.25-.25,0,.06c.1.11.27.4.34.42s.19.16.31.33c0,0,.18.14.29.25s.1.08.07,0,0-.1,0-.16c0-.25,0-.26.24,0a2.26,2.26,0,0,0,.24.38c.15.08.18,0,.05-.33-.06-.13.07,0,0-.23s-.2-.44-.12-.45,0-.07-.06-.18l-.08-.15s0-.19-.09-.37a3.93,3.93,0,0,0-.33-.64l0-.06.36-.44a4.47,4.47,0,0,0,.53-.88l.32-.43.21-.45c.13-.19.29-.46.31-.49s.13-.3.2-.45.13-.28.2-.42.28-.57.45-.89a4.12,4.12,0,0,0,.25-.57,4.72,4.72,0,0,0,.24-.69,5.49,5.49,0,0,1,.27-.78,4.5,4.5,0,0,0,.32-1c.05-.25.12-.53.21-.86a26.41,26.41,0,0,0,.57-2.92c.05-.32.1-.78.11-.94,0-.61.09-1.36.09-2.06S4602.92-1989.89,4602.87-1990.71Zm-35.09,11-.29-.45-.29-.44-.57-.9-.53-.92c-.17-.31-.36-.61-.53-.92s-.44-.73-.71-1.27l-.21-.42-.2-.42-.4-.85-.18-.37c-.06-.13-.11-.25-.16-.38l-.32-.76-.36-.86-.32-.88c-.08-.22-.18-.5-.24-.64l-.09-.21-.08-.21c-.06-.15-.11-.29-.16-.44l-.3-.9c-.1-.31-.18-.62-.26-.93s-.17-.62-.26-.92-.17-.65-.24-1l-.22-1-.06-.25c0-.08,0-.16-.05-.24l-.09-.49c-.07-.32-.14-.64-.22-.94s-.09-.61-.14-.92l-.13-.92,0-.34,0-.33a3,3,0,0,0-.09-.53c0-.53-.12-.71-.15-1.18s-.07-.82-.1-1.22-.05-1.21-.05-1.82a10.13,10.13,0,0,1,0-1.89c0-.27,0-.53.06-.78s0-.49.07-.74.06-.48.1-.73l.06-.37c0-.13.05-.25.09-.38s0-.23.05-.35a10.68,10.68,0,0,1,.7-2.36l.3-.68c.11-.21.19-.42.29-.64s.22-.39.36-.62l.24-.34a3.54,3.54,0,0,1,.19-.31,7.26,7.26,0,0,1,1.12-1.33c.22-.21.56-.5.67-.6a5.88,5.88,0,0,1,.84-.67c.19-.13.39-.25.59-.36a4.81,4.81,0,0,0,.47.66.59.59,0,0,1,.07.14,3.83,3.83,0,0,0,.32.56,4.05,4.05,0,0,0,.27.39,3,3,0,0,1,.23.31,4.1,4.1,0,0,0,.48.69c.1.14.21.27.3.41s.1.18.17.28.2.29.29.45.28.36.41.55.22.38.39.61a5.75,5.75,0,0,1,.71,1c.16.22.32.46.48.65s.27.45.46.69l.48.65.41.57.48.65c.19.23.21.38.39.61s.32.43.48.65l.48.65a5.93,5.93,0,0,1,.48.71c.13.29.3.33.42.55a1.28,1.28,0,0,1,.15.23,2.15,2.15,0,0,0,.18.3l.65.9a3.46,3.46,0,0,0,.46.57,1.21,1.21,0,0,1,.14.22.88.88,0,0,0,.18.29.64.64,0,0,1,.21.29,5.35,5.35,0,0,1,.39.48c.24.36.5.72.75,1.07l.7,1,.75,1.07a5.94,5.94,0,0,0,.74,1,2.53,2.53,0,0,0,.38.62l.14.21-.52.94-.69,1.22c-.24.44-.5.88-.74,1.32a8.92,8.92,0,0,0-.65,1.26,3.62,3.62,0,0,0-.45.71l-1.65,3a4.25,4.25,0,0,0-.43.85,3.43,3.43,0,0,1-.28.47,1.15,1.15,0,0,0-.21.33,1.53,1.53,0,0,1-.33.58,1.53,1.53,0,0,0-.19.42l-.16.2-.07.22a1.62,1.62,0,0,0-.16.21,2.69,2.69,0,0,1-.44.79,2.16,2.16,0,0,0-.29.55.94.94,0,0,1-.19.34,1.24,1.24,0,0,0-.24.42,2.46,2.46,0,0,1-.18.37l-.69,1.22a4.13,4.13,0,0,0-.21.39,4.38,4.38,0,0,1-.44.86l-.57,1c-.14.26-.18.45-.37.75a2.59,2.59,0,0,0-.32.65l-.16.21a1.27,1.27,0,0,1-.08.23l-.09.16C4568.68-1978.41,4568.23-1979.13,4567.78-1979.76Zm27.29,5.68-.37.39-.38.39-.79.77a17,17,0,0,1-1.74,1.44A17.61,17.61,0,0,1,4590-1970a14.73,14.73,0,0,1-1.89.88l-.47.17a2.42,2.42,0,0,1-.36.11c-.43.09-.95.24-1.44.33a12.85,12.85,0,0,1-2,.22c-.38,0-.77,0-1.14,0a10.06,10.06,0,0,1-1.12-.17l-.94-.2-.43-.11-.44-.14a14.91,14.91,0,0,1-1.69-.74,16.86,16.86,0,0,1-1.6-.95c-.54-.38-.94-.63-1.39-1s-.66-.54-1-.83-.64-.59-.93-.89c-.6-.62-1-.93-1.54-1.55-.21-.24-.41-.48-.61-.73l0-.06a2.78,2.78,0,0,1,.27-.56l.8-1.42a15.66,15.66,0,0,1,.82-1.56c.06-.1.15-.25.17-.3a4.93,4.93,0,0,1,.43-.86,6.18,6.18,0,0,0,.54-1.05c.19-.34.38-.7.57-1s.28-.61.48-.95a9.89,9.89,0,0,0,.71-1.36l1.09-1.94a22.26,22.26,0,0,0,1.13-1.93c.35-.6.68-1.22,1-1.83a2.77,2.77,0,0,1,.22-.38,3.9,3.9,0,0,0,.4-.64l.51-.91.57-1c.2-.32.27-.56.43-.85l.44-.79a2.13,2.13,0,0,0,.32.38,1.75,1.75,0,0,1,.25.4.85.85,0,0,0,.17.29,1.07,1.07,0,0,1,.32.47,1.07,1.07,0,0,0,.26.32l.08.19.15.15a1.17,1.17,0,0,0,.1.2,2,2,0,0,1,.43.65,1.86,1.86,0,0,0,.32.44.64.64,0,0,1,.18.27.89.89,0,0,0,.23.35,1.82,1.82,0,0,1,.22.29l.66,1a3.3,3.3,0,0,0,.22.32,4.42,4.42,0,0,1,.5.68c.19.28.37.56.55.84a6,6,0,0,1,.44.59,1.81,1.81,0,0,0,.37.5l.09.2a1.14,1.14,0,0,1,.15.16,3.63,3.63,0,0,0,.49.67l.55.84.49.76a1.09,1.09,0,0,0,.16.24,3.65,3.65,0,0,1,.48.69c.65,1,1.31,2,1.94,3.05a2.09,2.09,0,0,0,.32.44l.09.21.15.16.63,1a2.42,2.42,0,0,0,.27.39,5.67,5.67,0,0,0,.36.44,1.94,1.94,0,0,1,.26.34c.38.63.77,1.25,1.14,1.85.11.12.24.28.26.21s.16.12.24.2l.08.13C4595.41-1974.49,4595.24-1974.28,4595.07-1974.08Zm5.09-13.79,0,.48v.24l0,.25c0,.19,0,.39-.06.59l-.07.6c-.06.4-.11.77-.13,1.09a18.15,18.15,0,0,1-.5,2.2c-.24.8-.32,1.27-.6,2-.35.94-.85,1.92-1.21,2.75-.2.36-.4.71-.62,1.06a1.16,1.16,0,0,0-.16-.2,1.28,1.28,0,0,1-.1-.15l-.95-1.55a11.41,11.41,0,0,0-.83-1.4l-.43-.69a9.33,9.33,0,0,0-.72-1.23c-.26-.43-.54-.85-.81-1.28-.06-.1-.1-.2-.17-.35l-.4-.62-.44-.68c-.14-.25-.29-.4-.42-.6-.25-.35-.48-.73-.7-1.07l-.1-.22a1.78,1.78,0,0,1-.33-.43l-.77-1.18a4.81,4.81,0,0,1-.45-.61c-.14-.22-.28-.45-.43-.66s-.13-.21-.16-.24a4.6,4.6,0,0,1-.5-.68,5.5,5.5,0,0,0-.61-.84c-.18-.28-.39-.56-.55-.84s-.37-.46-.56-.74a7.58,7.58,0,0,0-.78-1.09l-1.08-1.59a15.59,15.59,0,0,0-1.06-1.63l-.32-.48,0-.06c.22-.37.27-.61.48-1s.42-.74.63-1.12a4.13,4.13,0,0,0,.21-.39,8.19,8.19,0,0,1,.61-1.17c.34-.61.69-1.22,1-1.83.12-.21.17-.39.32-.65s.3-.54.46-.81l.39-.72.46-.81c.06-.1.14-.23.17-.3.22-.55.59-1.11.88-1.67a16.85,16.85,0,0,0,.94-1.77c.16-.27.31-.54.46-.81a2.2,2.2,0,0,0,.26-.55v0l.1.11c.3.41.67.83,1,1.28l.56.66.53.68.27.35c.09.12.18.23.26.35l.52.72.26.36.25.36.49.73c.14.22.25.45.44.78l.42.68.45.79.23.41.22.41.42.82c.14.3.26.55.39.78s.24.46.35.71l.29.68.14.34a3.45,3.45,0,0,1,.14.34l.25.68.12.33c0,.11.08.22.11.33l.13.54a6.37,6.37,0,0,1,.37,1.14,24.11,24.11,0,0,1,.66,3.1,17.86,17.86,0,0,1,.32,3.41c0,.23,0,.56,0,.66a3,3,0,0,1,0,.43C4600.17-1988.19,4600.16-1988,4600.16-1987.87Z" transform="translate(-4557.65 2023.98)"></path></svg>
    );
}