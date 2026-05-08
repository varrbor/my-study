class Handler {
  setNext(handler) {
    this.next = handler
    return handler
  }

  handle(request) {
    if (this.next) {
      return this.next.handle(request)
    }
    return true
  }
}
class UsernameHandler extends Handler {
  handle(request) {
    if (!request.username) {
      console.log("❌ Username is required")
      return false
    }
    console.log("✔ Username OK")
    return super.handle(request)
  }
}
class PasswordHandler extends Handler {
  handle(request) {
    if (!request.password || request.password.length < 6) {
      console.log("❌ Password too short")
      return false
    }
    console.log("✔ Password OK")
    return super.handle(request)
  }
}
class EmailHandler extends Handler {
  handle(request) {
    if (!request.email || !request.email.includes("@")) {
      console.log("❌ Invalid email")
      return false
    }
    console.log("✔ Email OK")
    return super.handle(request)
  }
}

// Build the chain
const username = new UsernameHandler()
const password = new PasswordHandler()
const email = new EmailHandler()

// username → password → email
username.setNext(password).setNext(email)


const request = {
  username: "Bohdan",
  password: "secret123",
  email: "bohdan@example.com"
}

console.log("Result:", username.handle(request))

