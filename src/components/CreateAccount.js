function CreateAccount() {
  return (
    <main>
      <h1>Create Account</h1>
      <form>
        <input type="text" placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Create Account</button>
      </form>
    </main>
  );
}

export default CreateAccount;
