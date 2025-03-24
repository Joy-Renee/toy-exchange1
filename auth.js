// 🔹 Signup Request
async function signupUser(userData) {
    try {
        const response = await fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html"; // Redirect to login page
        } else {
            alert(data.error || "Signup failed.");
        }
    } catch (error) {
        console.error("Signup error:", error);
    }
}

// 🔹 Login Request
async function loginUser(credentials) {
    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            alert("Login successful!");
            window.location.href = "profile.html"; // Redirect to profile page
        } else {
            alert(data.error || "Login failed.");
        }
    } catch (error) {
        console.error("Login error:", error);
    }
}

// 🔹 Fetch Profile Data
async function fetchUserProfile() {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("Please log in first.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        const data = await response.json();
        if (response.ok) {
            console.log("User Profile:", data);
            document.getElementById("username").textContent = data.username;
            document.getElementById("email").textContent = data.email;
            document.getElementById("phone").textContent = data.phone_number;
        } else {
            alert(data.error || "Failed to fetch profile.");
        }
    } catch (error) {
        console.error("Profile fetch error:", error);
    }
}
