from unittest import TestCase
from server import app 
import model
class FlaskTestsBasic(TestCase):
    """Flask tests."""

    def setUp(self):
        """Stuff to do before every test."""

        # Get the Flask test client
        self.client = app.test_client()

        # Show Flask errors that happen during tests
        app.config['TESTING'] = True

    def test_index(self):
        """Test homepage page."""

        result = self.client.get("/")
        self.assertIn(b"Welcome to Schoolboard", result.data)

    
    # def test_login(self):
    #     """Test login page."""

    #     result = self.client.post("/",
    #                                 data={"email": "user@user.com", "password": "123"},
    #                                 follow_redirects=True)
    #     self.assertIn(b"Welcome", result.data)

if __name__ == "__main__":
    import unittest

    unittest.main()