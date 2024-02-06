import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useAuth } from "../../contexts/AuthContext";
import { DailyQuestion } from "../dailyQuestion";
import * as S from "./dashboard.styles";

export function Dashboard() {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const shareUrl = window.location.href;
  const title = "Check this out!";

  return (
    <S.Card>
      <Navbar expand="lg">
        <S.StyledNav>
          <S.IconWrapper>
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={shareUrl}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <RedditShareButton url={shareUrl} title={title}>
              <RedditIcon size={32} round />
            </RedditShareButton>
            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            {currentUser && (
              <Nav.Link onClick={handleLogout}>
                <IoLogOutOutline size="26" />
              </Nav.Link>
            )}
          </S.IconWrapper>
        </S.StyledNav>
      </Navbar>
      <DailyQuestion />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </S.Card>
  );
}
