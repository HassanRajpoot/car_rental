#!/usr/bin/env python3
"""
Integration testing script for Car Rental API
Tests the main endpoints and workflows
"""

import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:8000/api/v1"
HEALTH_URL = "http://localhost:8000/health/"


def test_health_check():
    """Test health check endpoint"""
    print("\n🏥 Testing Health Check...")
    try:
        response = requests.get(HEALTH_URL)
        print(f"✅ Health check: {response.json()}")
        return True
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        return False


def test_register_user():
    """Test user registration"""
    print("\n👤 Testing User Registration...")
    user_data = {
        "username": f"testuser_{datetime.now().timestamp()}",
        "email": f"test_{datetime.now().timestamp()}@example.com",
        "password": "TestPass123!@#",
        "password_confirm": "TestPass123!@#",
        "first_name": "Test",
        "last_name": "User",
        "role": "customer"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/register/", json=user_data)
        if response.status_code == 201:
            print(f"✅ Registration successful: {response.json()}")
            return response.json()
        else:
            print(f"❌ Registration failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Registration error: {e}")
        return None


def test_login(username, password):
    """Test user login"""
    print("\n🔐 Testing User Login...")
    login_data = {
        "username": username,
        "password": password
    }
    
    try:
        response = requests.post(f"{BASE_URL}/login/", json=login_data)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Login successful: Token received")
            return data.get('token')
        else:
            print(f"❌ Login failed: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Login error: {e}")
        return None


def test_get_popular_cars():
    """Test getting popular cars (public endpoint)"""
    print("\n🚗 Testing Get Popular Cars...")
    try:
        response = requests.get(f"{BASE_URL}/cars/popular/")
        if response.status_code == 200:
            cars = response.json()
            print(f"✅ Popular cars fetched: {len(cars)} cars")
            return cars
        else:
            print(f"❌ Failed to get popular cars: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error fetching popular cars: {e}")
        return None


def test_get_all_cars():
    """Test getting all cars (public endpoint)"""
    print("\n🚗 Testing Get All Cars...")
    try:
        response = requests.get(f"{BASE_URL}/cars/")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Cars fetched: {data}")
            return data
        else:
            print(f"❌ Failed to get cars: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error fetching cars: {e}")
        return None


def test_get_me(token):
    """Test getting current user profile"""
    print("\n👤 Testing Get Current User...")
    headers = {"Authorization": f"Bearer {token}"}
    
    try:
        response = requests.get(f"{BASE_URL}/me/", headers=headers)
        if response.status_code == 200:
            user = response.json()
            print(f"✅ User profile fetched: {user}")
            return user
        else:
            print(f"❌ Failed to get user profile: {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error fetching user profile: {e}")
        return None


def test_cors():
    """Test CORS headers"""
    print("\n🌐 Testing CORS...")
    headers = {
        "Origin": "http://localhost:5173",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers": "Content-Type"
    }
    
    try:
        response = requests.options(f"{BASE_URL}/login/", headers=headers)
        cors_header = response.headers.get('Access-Control-Allow-Origin')
        if cors_header:
            print(f"✅ CORS enabled: {cors_header}")
            return True
        else:
            print(f"❌ CORS not configured properly")
            return False
    except Exception as e:
        print(f"❌ CORS test error: {e}")
        return False


def run_all_tests():
    """Run all integration tests"""
    print("=" * 60)
    print("🧪 Car Rental API Integration Tests")
    print("=" * 60)
    
    results = {
        "passed": 0,
        "failed": 0
    }
    
    # Test 1: Health Check
    if test_health_check():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 2: CORS
    if test_cors():
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 3: Get popular cars (public)
    if test_get_popular_cars() is not None:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 4: Get all cars (public)
    if test_get_all_cars() is not None:
        results["passed"] += 1
    else:
        results["failed"] += 1
    
    # Test 5: Register user
    registration_data = test_register_user()
    if registration_data:
        results["passed"] += 1
        
        # Test 6: Login with registered user
        token = test_login(
            registration_data['user']['username'],
            "TestPass123!@#"
        )
        if token:
            results["passed"] += 1
            
            # Test 7: Get current user profile
            if test_get_me(token):
                results["passed"] += 1
            else:
                results["failed"] += 1
        else:
            results["failed"] += 2  # Login and profile test failed
    else:
        results["failed"] += 3  # Registration, login, and profile test failed
    
    # Print results
    print("\n" + "=" * 60)
    print("📊 Test Results")
    print("=" * 60)
    print(f"✅ Passed: {results['passed']}")
    print(f"❌ Failed: {results['failed']}")
    print(f"📈 Success Rate: {results['passed'] / (results['passed'] + results['failed']) * 100:.1f}%")
    print("=" * 60)


if __name__ == "__main__":
    run_all_tests()

