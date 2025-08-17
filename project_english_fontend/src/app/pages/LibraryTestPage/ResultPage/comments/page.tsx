'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@nextui-org/react";

interface Comment {
  id: number;
  username: string;
  comment: string;
  date: string;
  replies?: Comment[];
}

export function Comments() {
  const [activeReplyId, setActiveReplyId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 5; // Number of comments per page

  // Fetch comments from API
  const fetchComments = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/comments?page=${pageNum}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      const newComments = data.comments;

      setComments((prev) => (pageNum === 1 ? newComments : [...prev, ...newComments]));

      setHasMore(newComments.length === limit); // If fewer comments than limit, no more to load

    } catch (err: any) {
      setError(err.message || "Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and refetch on page change
  useEffect(() => {
    fetchComments(page);
  }, [page]);

  const handlePostComment = async () => {
    if (!username || !email || !comment) {
      alert("Please fill in all fields before posting!");
      return;
    }

    const newComment: Comment = {
      id: Date.now(), // Temporary ID, will be replaced by API
      username,
      comment,
      date: new Date().toLocaleString(),
      replies: [],
    };

    try {
      const response = await fetch("http://localhost:8080/comment/create-comment", {

        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),

      });

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Reset form and refetch comments
      setUsername("");
      setEmail("");
      setComment("");
      setPage(1); // Reset to page 1 to show the new comment
    } catch (err: any) {
      setError(err.message || "Error posting comment");
    }
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((c) => c.id === id);
    if (commentToEdit) {
      setUsername(commentToEdit.username);
      setEmail("");
      setComment(commentToEdit.comment);
      setEditCommentId(id);
    }
  };

  const handleUpdateComment = () => {
    if (!username || !email || !comment) {
      alert("Please fill in all fields before updating!");
      return;
    }
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === editCommentId
          ? { ...c, username, comment, date: new Date().toLocaleString() }
          : c
      )
    );
    setUsername("");
    setEmail("");
    setComment("");
    setEditCommentId(null);
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((c) => c.id !== id));
  };

  const handleReplyChange = (id: number, value: string) => {
    setReplyText({ ...replyText, [id]: value });
  };

  const handleReplySubmit = (parentId: number) => {
    const reply = replyText[parentId];
    if (!reply || !username || !email) {
      alert("Please fill in all fields before replying!");
      return;
    }

    const newReply: Comment = {
      id: Date.now(),
      username,
      comment: reply,
      date: new Date().toLocaleString(),
    };

    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === parentId
          ? { ...c, replies: [...(c.replies || []), newReply] }
          : c
      )
    );

    setReplyText({ ...replyText, [parentId]: "" });

    setUsername("");

    setEmail("");

  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col gap-4">

      <div className="w-11/12 max-w-4xl bg-white rounded-lg border-2 p-6 mx-auto">

        <h1 className="text-2xl font-bold text-customBlue mb-4 text-left">
          Comments
        </h1>

        <p className="text-lg text-customBlue mb-6 text-left">
          Post a comment on IELTS Mock Test 2023 September Listening Practice Test 1
        </p>

        {error && (
          <p className="text-red-500 mb-4 text-center">{error}</p>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 px-2 py-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full md:w-6/12 focus:border-blue-500 rounded bg-white text-customBlue"
          />

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 px-4 py-2 w-full md:w-6/12 focus:border-blue-500 rounded bg-white text-customBlue"
          />

        </div>

        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-6 h-48 focus:border-blue-500 text-black"
          placeholder="Type comment here"
        />

        <div className="flex justify-end">
          <Button
            onClick={editCommentId ? handleUpdateComment : handlePostComment}
            className="px-6 py-2 bg-customBlue text-white rounded shadow hover:bg-blue-600"
            disabled={loading}
          >
            {editCommentId ? "Update Comment" : "Post Comment"}
          </Button>
        </div>

      </div>

      <div className="my-8 mx-80 mt-14">

        <h2 className="text-2xl font-bold text-customBlue">Comments:</h2>

        {loading && page === 1 && (
          <p className="text-gray-500 text-center">Loading comments...</p>
        )}

        {comments.length === 0 && !loading ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-4 w-full mt-2">
            {comments.map((c) => (
              <li
                key={c.id}
                className="p-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50"
              >
                <p className="text-sm text-gray-600 mb-2">
                  <strong>{c.username}</strong> - <span>{c.date}</span>
                </p>
                <p className="text-gray-800">{c.comment}</p>
                <div className="flex gap-4 mt-4 justify-end">
                  <Button
                    onClick={() => handleEditComment(c.id)}
                    className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteComment(c.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => handleReplySubmit(c.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Reply
                  </Button>
                </div>

                {/* Replies */}
                {c.replies && c.replies.length > 0 && (
                  <ul className="ml-8 mt-4 space-y-2">
                    {c.replies.map((r) => (
                      <li key={r.id} className="bg-white p-3 border rounded">
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>{r.username}</strong> - <span>{r.date}</span>
                        </p>
                        <p className="text-gray-700">{r.comment}</p>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Reply form */}
                <div className="mt-4 ml-4">
                  <Textarea
                    placeholder="Write a reply..."
                    value={replyText[c.id] || ""}
                    onChange={(e) => handleReplyChange(c.id, e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black mb-2"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-customBlue text-white rounded shadow hover:bg-blue-600"
            >
              Load More
            </Button>
          </div>
        )}
        {loading && page > 1 && (
          <p className="text-gray-500 text-center mt-4">Loading more comments...</p>
        )}
      </div>
    </div>
  );
}