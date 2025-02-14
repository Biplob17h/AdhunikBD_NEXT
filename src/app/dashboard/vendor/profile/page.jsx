"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, User, Key } from "lucide-react";
import { useState, useEffect } from "react";
import useUser from "@/hooks/UserHook";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";  // Import Avatar components

export default function ProfilePage() {
  const { user, loading, error } = useUser();

  // State for editable fields
  const [editableProfile, setEditableProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // State for password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (user) {
      setEditableProfile(user); // Update editable profile when user data is available
    }
  }, [user]);

  const handleSave = () => {
    console.log("Profile updated:", editableProfile);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters long.");
      return;
    }
    console.log("Password changed successfully:", passwordData);
    setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    setPasswordError("");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data: {error.message}</div>;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Profile</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            {/* Profile Photo */}
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={editableProfile.vendorPhoto || "https://github.com/shadcn.png"}
                alt="Profile Picture"
              />
              <AvatarFallback>{editableProfile.vendorName?.[0] || "JD"}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editableProfile.vendorName || ""}
                onChange={(e) =>
                  setEditableProfile({
                    ...editableProfile,
                    vendorName: e.target.value,
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="email"
                  value={editableProfile.email || ""}
                  onChange={(e) =>
                    setEditableProfile({
                      ...editableProfile,
                      email: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="phone"
                  value={editableProfile.phone || ""}
                  onChange={(e) =>
                    setEditableProfile({
                      ...editableProfile,
                      phone: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                <Input
                  id="address"
                  value={editableProfile.location?.join(", ") || ""}
                  onChange={(e) =>
                    setEditableProfile({
                      ...editableProfile,
                      location: e.target.value.split(", "),
                    })
                  }
                  disabled={!isEditing}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Change Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="current-password">Current Password</Label>
            <Input
              id="current-password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                })
              }
              placeholder="Enter your current password"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                })
              }
              placeholder="Enter your new password"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirm-new-password">Confirm New Password</Label>
            <Input
              id="confirm-new-password"
              type="password"
              value={passwordData.confirmNewPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmNewPassword: e.target.value,
                })
              }
              placeholder="Confirm your new password"
            />
          </div>

          {passwordError && <div className="text-sm text-red-500">{passwordError}</div>}

          <Button onClick={handlePasswordChange}>Change Password</Button>
        </CardContent>
      </Card>

      {/* Save Button */}
      {isEditing && (
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
}
