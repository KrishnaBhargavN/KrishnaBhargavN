function Form() {
  async function makeApiCall() {
    await fetch("/api/users", {
      method: "POST",
    });
  }
  return (
    <div>
      <form>
        <label htmlFor="inputText">Input your text here</label>
        <br />
        <textarea
          className="bg-slate-800 slate text-slate-100"
          type="text"
          id="inputTextId"
          name="inputTextName"
          rows={10}
          cols={100}
        />
        <br />
        <button className="bg-slate-400" type="submit" onClick={makeApiCall()}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
